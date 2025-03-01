import express from 'express';

import { getSessions } from '../application/dto/sessions.js';
import { getPatientsList } from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get', getSessions);
sessionsRouter.get('/patientslist', getPatientsList);

export default sessionsRouter;