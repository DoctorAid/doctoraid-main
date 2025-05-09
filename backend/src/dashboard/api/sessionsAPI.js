import express from 'express';

import { 
    getSessionsByDocId,
    getWaitingList,
    getPatientList 
} from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get/:doctorId', getSessionsByDocId);
sessionsRouter.get('/:sessionId/waitingList', getWaitingList);
sessionsRouter.get('/:sessionId/patientList', getPatientList);

export default sessionsRouter;