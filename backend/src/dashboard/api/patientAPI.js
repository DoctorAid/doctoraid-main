import express from 'express';

import {searchPatients} from '../application/dto/patient.js';
import {getPatientList} from '../application/dto/patient.js';
import {sortPatientList} from '../application/dto/patient.js';
import {getPatientProfile} from '../application/dto/patient.js';

const patientRouter = express.Router();

patientRouter.get('/search/byName', searchPatients); //search patients by their name
patientRouter.get('/search/byEmail', searchPatients);    //search patients by thier email
patientRouter.get('/getPatients', getPatientList);   //get the patient list
patientRouter.get('/sort/byName', sortPatientList);    //sorting the patient list in ascending/ decending order
patientRouter.get('/getPatientProfile/byPatientId', getPatientProfile);  //retrieving patient profile by the patient id


export default patientRouter;
