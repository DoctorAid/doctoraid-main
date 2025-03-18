import express from 'express';
import { createRecord, getRecordsByPatientandDoctor, getRecordsByPatient, getRecordById, updateRecord } from '../application/dto/record.js';

const recordRouter = express.Router();

recordRouter.post('/create/:doctorId', createRecord); // Create a new record when doctor clicks Save
recordRouter.get('/getByPatientId', getRecordsByPatient); // Get records by patient ID      //done
recordRouter.get('/getByPatientId&DoctorId', getRecordsByPatientandDoctor); // Get records by patient ID & doctor ID        //done
recordRouter.get('/getByRecordId', getRecordById); // Get a specific record by record ID        //done
recordRouter.put('/update/:id', updateRecord); // Update an ongoing checkup record

export default recordRouter;