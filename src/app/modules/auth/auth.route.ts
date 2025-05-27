// src/app/modules/auth/auth.route.ts
import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/jwt', AuthController.createJWT);
router.post('/logout', AuthController.clearJWT);

export const authRoutes = router;
