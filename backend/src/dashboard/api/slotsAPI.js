import express from 'express';
import { getSlotsbySession } from '../application/dto/slots.js';
import { createSlots } from "../application/dto/slots.js";
import { cancelAppointment } from "../application/dto/slots.js";

const slotsRouter = express.Router();

slotsRouter.post('/create', createSlots);
slotsRouter.get('/getbySessionId/:id', getSlotsbySession);  
slotsRouter.put('/cancel/bySessionId/:id', cancelAppointment);

export default slotsRouter;