import express from 'express';
import { EventsControllers } from './events.controller';

const router = express.Router();
router.get('/', EventsControllers.getAllEvents);
router.get('/top-events', EventsControllers.getTopEvents);
router.get('/:id', EventsControllers.getSingleEvent);

export const EventsRoutes = router;
