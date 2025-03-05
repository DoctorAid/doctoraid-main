import express from 'express';
import { getDoctorById, searchDoctors, subscribeToDoctor, getFamilyById, bookSlot, getActiveAppointments } from '../application/dto/mobile.js';

const mobileRouter = express.Router();


mobileRouter.get('/doctor/:id', getDoctorById);

mobileRouter.get('/doctors/search', searchDoctors);

mobileRouter.get('/doctors/subscribe', subscribeToDoctor);

mobileRouter.get('/family-profile/:familyId', getFamilyById);

mobileRouter.post('/slots/book', bookSlot);

mobileRouter.get('/appointments/active/:patientId', getActiveAppointments);

export default mobileRouter;