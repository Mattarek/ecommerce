import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app: Application = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
      credentials: true,
      origin: ['http://localhost:5173'],
  }),
)

const MONGODB_URI =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URI).then(() => console.log('Connected to Mongo')).catch(() => console.log('Error connecting to Mongo');
