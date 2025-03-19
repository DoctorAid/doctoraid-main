import express from 'express';
import {getRecordsByFamilyId} from '../application/dto/patient.js';
import {createPatients} from '../application/dto/patient.js';
import { addPatient } from '../application/dto/patient.js';
import { updatePatient } from '../application/dto/patient.js';
import { getNearbyDoctors } from '../application/dto/patient.js';
import { bookSlot } from '../application/dto/patient.js';
import { searchDoctors } from '../application/dto/patient.js';
import {subscribeDoctor, unsubscribeDoctor, getSubscribedDoctors} from '../application/dto/patient.js';
import { enterPin } from '../application/dto/mobile.js';
import { getAllBookings } from '../application/dto/patient.js';

const patientRouter = express.Router();

patientRouter.post('/create', createPatients); //creating patients
patientRouter.post('/add', addPatient); //adding patients
patientRouter.put('/update/:id', updatePatient); //updating patients
patientRouter.get('/nearby-doctors/:id', getNearbyDoctors); //getting nearby doctors
patientRouter.put('/doctors/:slotId/book', bookSlot); //booking a slot
patientRouter.post('/booked/pin', enterPin); //entering pin
patientRouter.get('/doctors/search', searchDoctors); //searching doctors
patientRouter.get('/family/records/:id', getRecordsByFamilyId); //getting patient medical records by thier family Id  
patientRouter.post('/doctors/subscribe', subscribeDoctor); //subscribing to a doctor
patientRouter.post('/doctors/unsubscribe', unsubscribeDoctor); //unsubscribing to a doctor   
patientRouter.get('/doctors/subscribed/:familyId', getSubscribedDoctors); //getting subscribed doctors
patientRouter.get('/bookings/:familyId', getAllBookings); //getting all bookings

export default patientRouter;
