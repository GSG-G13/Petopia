import CustomError from './CustomError'
import { type Request, type Response, type NextFunction } from 'express'

const serverError = (
  err: { name?: string, status?: number, message?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
): unknown => {
  const { status, message } = err

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: true,
      data: { message }
    })
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: true,
      data: {
        message: 'Unauthorized'
      }
    })
  }

  if (err instanceof CustomError) {
    if (status !== undefined) {
      return res.status(status).json({
        error: true,
        data: {
          message
        }
      })
    }
  }

  return res.status(500).json({
    error: true,
    data: {
      message: 'Internal server error'
    }
  })
}
export default serverError
