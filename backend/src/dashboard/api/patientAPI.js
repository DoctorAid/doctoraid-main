import express from 'express';

import {
    getRecordsByFamilyId,
    createPatients, 
    addPatient,
    updatePatient,
    getNearbyDoctors,
    bookSlot,
    searchDoctors,
    subscribeDoctor,
    unsubscribeDoctor, 
    getSubscribedDoctors,
    getAllBookings,
    enterPin,
    getDetails
} from '../application/dto/patient.js';

const patientRouter = express.Router();

patientRouter.post('/create', createPatients); //creating patients
patientRouter.get('/get/details/:id', getDetails);  //getting patient details
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
patientRouter.get('/doctors/subscribed/:familyId', getSubscribedDoctors); //getting subscribed doctors

export default patientRouter;
