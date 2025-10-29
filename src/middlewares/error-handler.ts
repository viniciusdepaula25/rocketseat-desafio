import { Response, Request, NextFunction } from 'express'
import AppError from 'src/error/app-error'

export default function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
    error: JSON.stringify(err),
  })
}
