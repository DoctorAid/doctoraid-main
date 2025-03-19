import express from 'express';
import { getSessions } from '../application/dto/sessions.js';
import { getWaitingList, getPatientList } from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get', getSessions);
sessionsRouter.get('/waitingList', getWaitingList);
sessionsRouter.get('/patientList', getPatientList);
export default sessionsRouter;