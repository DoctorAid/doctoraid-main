import express from 'express';
import {getDoctorDetails,addDoctorDetails,getSessionsByDoctor,getPatientsByDoctor,addDoctorToPatient } from '../application/dto/doctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/details', getDoctorDetails); //get the doctor details
doctorRouter.get('/create/profile', addDoctorDetails ); //create a doctor profile
doctorRouter.get('sessions', getSessionsByDoctor); //get the sessions based on doctorAid
doctorRouter.get('/patients', getPatientsByDoctor); //get the patients based on doctorId
doctorRouter.post('/addPatient', addDoctorToPatient); //add a patient to the doctor

export default doctorRouter;
