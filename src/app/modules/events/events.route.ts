import express from 'express';
import { EventsControllers } from './events.controller';

const router = express.Router();
router.get('/', EventsControllers.getAllEvents);

export const EventsRoutes = router;
