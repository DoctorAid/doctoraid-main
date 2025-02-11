import express from 'express';

import { getSessions } from '../application/dto/sessions.js';

const sessionsRouter = express.Router();

sessionsRouter.get('/get', getSessions);

export default sessionsRouter;