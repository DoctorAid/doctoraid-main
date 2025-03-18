import express from 'express';
import {getDoctorDetails,createDoctor, deleteDoctorDetails  ,getSessionsByDoctor,getPatientsByDoctor,addDoctorToPatient, getActiveAppointmentsByDoctor, getTotalPatientCountByDoctor } from '../application/dto/doctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/details/:id', getDoctorDetails); //get the doctor details  
doctorRouter.delete('/delete', deleteDoctorDetails); //delete the doctor
doctorRouter.post('/create', createDoctor ); //create a doctor profile
doctorRouter.get('/sessions/:id', getSessionsByDoctor); //get the sessions based on doctorAid
doctorRouter.get('/patients/:id', getPatientsByDoctor); //get the patients based on doctorId
doctorRouter.put('/addPatient/:id', addDoctorToPatient); //add a patient to the doctor
doctorRouter.get('/activeAppointments/:id', getActiveAppointmentsByDoctor); //get the active appointments based on doctorId
doctorRouter.get('/totalPatients/:id', getTotalPatientCountByDoctor); //get the total patient count based on doctorId

export default doctorRouter;
