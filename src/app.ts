// src/app.ts
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './app/modules/user/user.route';
import { EventsRoutes } from './app/modules/events/events.route';
import { authRoutes } from './app/modules/auth/auth.route';

const app: Application = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'http://localhost:3000',
      'https://ezyticket-7198b.web.app',
      'https://ezyticket-7198b.firebaseapp.com',
      'https://ezy-ticket-server.vercel.app',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/events', EventsRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
