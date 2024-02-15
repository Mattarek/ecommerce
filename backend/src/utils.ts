import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './models/userModel';

export const generateToken = (user: User) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'gwg3gwgw23gwgw23g2wg232g2g2g23h2wh2w3jh2wq',
        {
            expiresIn: '30d',
        },
    );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = authorization.slice(7, authorization.length); // Bearer xxxxx
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET || 'h3h34h3h2h2h2h2h24hw2eh2w4h2why2',
        );
        req.user = decode as {
            _id: string;
            name: string;
            email: string;
            isAdmin: boolean;
            token: string;
        };
        next();
    } else {
        res.status(401).json({ message: 'No Token' });
    }
};
