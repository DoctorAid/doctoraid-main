import express from 'express';
import { getDoctorById, searchDoctors } from '../application/dto/mobile.js';

const mobileRouter = express.Router();


mobileRouter.get('/doctor/:id', getDoctorById);

mobileRouter.get('/doctors/search', searchDoctors);

export default mobileRouter;