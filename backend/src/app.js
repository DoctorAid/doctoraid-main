import express from 'express';
import mongoose from 'mongoose';
import { connectDB } from './infrastructure/db.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

connectDB();
