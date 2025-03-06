import express from 'express';
import {getAllDoctors,getDoctorById,createDoctor,getSessionsByDoctor,getPatientsByDoctor,addDoctorToPatient, getActiveAppointmentsByDoctor, getTotalPatientCountByDoctor } from '../application/dto/doctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/all', getAllDoctors); //get the doctor details
doctorRouter.get('/:id', getDoctorById); //get the doctor details based on doctorId
doctorRouter.post('/create', createDoctor ); //create a doctor profile
doctorRouter.get('/sessions', getSessionsByDoctor); //get the sessions based on doctorAid
doctorRouter.get('/patients', getPatientsByDoctor); //get the patients based on doctorId
doctorRouter.post('/addPatient', addDoctorToPatient); //add a patient to the doctor
doctorRouter.get('/activeAppointments', getActiveAppointmentsByDoctor); //get the active appointments based on doctorId
doctorRouter.get('/totalPatients', getTotalPatientCountByDoctor); //get the total patient count based on doctorId

export default doctorRouter;
