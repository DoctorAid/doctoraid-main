import express from 'express';
import { getSlotsbySession } from '../application/dto/slots.js';
import { createSlots } from "../application/dto/slots.js";
import { cancelAppointment } from "../application/dto/slots.js";

const slotsRouter = express.Router();

slotsRouter.post('/create', createSlots);
slotsRouter.get('/getbySessionId', getSlotsbySession);
slotsRouter.put('/cancel/bySessionId', cancelAppointment);

export default slotsRouter;