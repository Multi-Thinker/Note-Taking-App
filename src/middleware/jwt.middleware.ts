import express from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export function authenticateJWT(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  jwt.verify(token, config.jwtSecret, (error, decoded) => {
    if (error) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: 'Token invalid or expired' });
    }

    req.userId = (decoded.id as string) ?? '';
    next();
  });
}
