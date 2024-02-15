import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app: Application = express();

dotenv.config()
app.use(express.json()); // parsing my data with json
app.use(express.urlencoded({ extended: true })); // parsing my request from forms with extended 

app.use(
  cors({
      credentials: true,
      origin: ['http://localhost:5173'],
  }),
)
app.use(express.static(path.join(__dirname, '../../frontend/build')));
app.get('*', (req: Request, res: Response) =>
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html')),
);

const PORT = process.env.PORT ?? 3001
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ecommerce';


app.listen(PORT, () => {
  try{
      mongoose.set('strictQuery', true);
      mongoose.connect(MONGODB_URI).then(() => console.log('Connected to Mongo')).catch(() => console.log('Error connecting to Mongo');
      console.log(`server started at http://localhost:${PORT}`);
  } catch(error) {
    console.error(error)
  }
});
