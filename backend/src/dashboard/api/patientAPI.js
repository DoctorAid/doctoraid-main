import express from 'express';

//import {searchPatients} from '../application/dto/patient.js';
import {getPatientList} from '../application/dto/patient.js';
import {sortPatientList} from '../application/dto/patient.js';
import {getPatientProfile} from '../application/dto/patient.js';
import {getMedicalRecords} from '../application/dto/patient.js';
import {createPatients} from '../application/dto/patient.js';
import {editPatientDetails} from '../application/dto/patient.js';
// import {createPatient} from '../application/dto/patient.js';
// import { 
//     createPatients, 
//     addPatient, 
//     testCreatePatient, 
//     getFamilyMembers,
//     getPatientById
//   } from '../application/dto/patient.js';

// import { authMiddleware } from '../middleware/clerkMiddleware.js';
const patientRouter = express.Router();

// patientRouter.post('/create', authMiddleware.requireAuth, createPatients);
// patientRouter.post('/add', authMiddleware.requireAuth, addPatient);
// patientRouter.get('/family', authMiddleware.requireAuth, getFamilyMembers);
// patientRouter.get('/:patientId', authMiddleware.requireAuth, getPatientById);


patientRouter.post('/create', createPatients); //creating patients
// patientRouter.post('/createPatient', createPatient);
//patientRouter.post('/addPatient', addPatient);  //adding a patient
// patientRouter.get('/search/byFirstName', searchPatients); //search patients by their first name
// patientRouter.get('/search/byLastName', searchPatients); //search patients by their last name
// patientRouter.get('/search/byEmail', searchPatients);    //search patients by thier email
// patientRouter.get('/getPatients', getPatientList);   //get the patient list
// patientRouter.get('/sort/byFirstName', sortPatientList);    //sorting the patient list in ascending/ decending order using first name
// patientRouter.get('/getPatientProfile/byPatientId', getPatientProfile);  //retrieving patient profile by the patient id
// patientRouter.get('/getMedicalRecords/byPatientId', getMedicalRecords); //getting patient medical records by thier Id
// patientRouter.put('/editPatientDetails/:patientId', editPatientDetails); //editing patient details by their Id

export default patientRouter;
