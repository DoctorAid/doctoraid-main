import express from 'express';

import { createSlots } from "../application/dto/slots.js";

const slotsRouter = express.Router();

slotsRouter.post('/create', createSlots);

export default slotsRouter;