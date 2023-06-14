import { type Request, type Response } from 'express'

const logout = (_req: Request, res: Response): void => {
  res.clearCookie('token').json({
    message: 'Logged Out Successfully.'
  })
}

export default logout
