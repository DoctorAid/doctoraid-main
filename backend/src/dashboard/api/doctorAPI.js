import express from 'express';
import {getDoctorDetails,addDoctorDetails } from '../application/dto/doctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/details', getDoctorDetails); //get the doctor details
doctorRouter.get('/create/profile', addDoctorDetails ); //create a doctor profile

export default doctorRouter;
