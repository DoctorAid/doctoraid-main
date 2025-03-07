import express from 'express';
import { getSessions } from '../application/dto/sessions.js';
import { getPatientsList } from '../application/dto/sessions.js';
import { getWaitingList } from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get', getSessions);
sessionsRouter.get('/patientslist', getPatientsList);
sessionsRouter.get('/waitinglist', getWaitingList);
export default sessionsRouter;