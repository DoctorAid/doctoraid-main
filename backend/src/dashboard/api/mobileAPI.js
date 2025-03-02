import express from 'express';
import { getDoctorById, searchDoctors, subscribeToDoctor, getFamilyById } from '../application/dto/mobile.js';

const mobileRouter = express.Router();


mobileRouter.get('/doctor/:id', getDoctorById);

mobileRouter.get('/doctors/search', searchDoctors);

mobileRouter.get('/doctors/subscribe', subscribeToDoctor);

mobileRouter.get('/family-profile/:familyId', getFamilyById);

export default mobileRouter;