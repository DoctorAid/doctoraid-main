import express from 'express';
import { getDoctorById, searchDoctors, subscribeToDoctor, getFamilyById, bookSlot, getActiveAppointments, enterPin } from '../application/dto/mobile.js';

const mobileRouter = express.Router();


mobileRouter.get('/doctor/:id', getDoctorById);

mobileRouter.get('/doctors/search', searchDoctors);


mobileRouter.get('/family-profile/:familyId', getFamilyById);

mobileRouter.get('/appointments/active/:patientId', getActiveAppointments);

mobileRouter.post('/pin', enterPin); 

export default mobileRouter;