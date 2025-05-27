// src/app/modules/auth/auth.controller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';

export const AuthController = {
  createJWT: async (req: Request, res: Response) => {
    try {
      const email = req.body;
      const token = jwt.sign(email, config.jwt_token as string, {
        expiresIn: '24hr',
      });

      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .status(200)
        .json({ success: true });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to create token',
        error: error.message,
      });
    }
  },

  clearJWT: async (req: Request, res: Response) => {
    try {
      res
        .clearCookie('token', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 0,
        })
        .status(200)
        .json({ success: true });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Failed to clear token',
        error: error.message,
      });
    }
  },
};
