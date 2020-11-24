import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

interface ErrorPayload {
  error: Error;
  req: Request;
  res: Response;
  next: NextFunction;
}

export default function errorMiddleware(data: ErrorPayload): Response {
  const { error, res } = data;

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error('Erro interno', error);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
