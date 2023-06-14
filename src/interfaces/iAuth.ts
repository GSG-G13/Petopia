import { type Request } from 'express'
interface User {
  userId: number
  email: string
  userType: string
}
interface CustomRequest extends Request {
  user?: User
}

export type { User, CustomRequest }
