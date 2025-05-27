import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { EventsRoutes } from './app/modules/events/events.route';

const app: Application = express();

//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/events', EventsRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getAController);

export default app;
