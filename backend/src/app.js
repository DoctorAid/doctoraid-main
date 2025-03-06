import express from 'express';
import { connectDB } from './infrastructure/db.js';
import sessionsRouter from './dashboard/api/sessionsAPI.js';
import slotsRouter from './dashboard/api/slotsAPI.js'
import recordRouter from './dashboard/api/recordAPI.js'
import patientRouter from './dashboard/api/patientAPI.js'
import doctorsRouter from './dashboard/api/doctorAPI.js'
import mobileRouter from './dashboard/api/mobileAPI.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/slots', slotsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/records', recordRouter);
app.use('/api/patients', patientRouter);
app.use('/api/doctors', doctorsRouter);
app.use('/api/mobile', mobileRouter);

connectDB();

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));