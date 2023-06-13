import CustomError from './CustomError'
import { type Request, type Response, type NextFunction } from 'express'

const serverError = (
  err: { name?: string, status?: number, message?: string, errors?: string[] },
  _req: Request,
  res: Response,
  _next: NextFunction
): unknown => {
  const { status, message, errors } = err

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      data: { errors }
    })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  if (err instanceof CustomError) {
    if (status !== undefined) {
      return res.status(status).json({
        message
      })
    }
  }

  return res.status(500).json({
    data: {
      message: 'Internal server error'
    }
  })
}
export default serverError
