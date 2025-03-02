import express from 'express';
import {getDoctorDetails,addDoctorDetails,getSessionsByDoctor } from '../application/dto/doctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/details', getDoctorDetails); //get the doctor details
doctorRouter.get('/create/profile', addDoctorDetails ); //create a doctor profile
doctorRouter.get('sessions', getSessionsByDoctor); //get the sessions based on doctorAid

export default doctorRouter;
