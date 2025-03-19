import express from 'express';

import { 
    getSessions,
    getWaitingList,
    getPatientList 
} from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get', getSessions);
sessionsRouter.get('/:sessionId/waitingList', getWaitingList);
sessionsRouter.get('/:sessionId/patientList', getPatientList);

export default sessionsRouter;