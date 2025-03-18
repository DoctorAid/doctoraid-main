import express from 'express';

//import {searchPatients} from '../application/dto/patient.js';
import {sortPatientList} from '../application/dto/patient.js';
import {getPatientProfile} from '../application/dto/patient.js';
import {getMedicalRecords} from '../application/dto/patient.js';
import {createPatients} from '../application/dto/patient.js';
import { addPatient } from '../application/dto/patient.js';
import { updatePatient } from '../application/dto/patient.js';
import { getNearbyDoctors } from '../application/dto/patient.js';
import { bookSlot } from '../application/dto/patient.js';

const patientRouter = express.Router();

patientRouter.post('/create', createPatients); //creating patients
patientRouter.post('/add', addPatient); //adding patients
patientRouter.put('/update/:id', updatePatient); //updating patients
patientRouter.get('/nearby-doctors/:id', getNearbyDoctors); //getting nearby doctors
patientRouter.post('/book-slot', bookSlot); //booking a slot
// patientRouter.get('/getPatients', getPatientList);   //get the patient list
// patientRouter.get('/sort/byFirstName', sortPatientList);    //sorting the patient list in ascending/ decending order using first name
// patientRouter.get('/getPatientProfile/byPatientId', getPatientProfile);  //retrieving patient profile by the patient id
// patientRouter.get('/getMedicalRecords/byPatientId', getMedicalRecords); //getting patient medical records by thier Id

export default patientRouter;
