import express from 'express';
import { createRecord, getRecordsByPatient, getRecordById, updateRecord } from '../application/dto/record.js';

const recordRouter = express.Router();

recordRouter.post('/create', createRecord); // Create a new record when doctor clicks Save
recordRouter.get('/getByPatientId', getRecordsByPatient); // Get records by patient ID & doctor ID
recordRouter.get('/get/:id', getRecordById); // Get a specific record by record ID
recordRouter.put('/update/:id', updateRecord); // Update an ongoing checkup record

export default recordRouter;