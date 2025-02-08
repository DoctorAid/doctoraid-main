import express from 'express';
import { connectDB } from './infrastructure/db.js';
import slotsRouter from './dashboard/api/slotsAPI.js'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/slots', slotsRouter);


connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));