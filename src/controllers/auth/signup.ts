import { type Request, type Response } from 'express'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../../models/User'
import { createUser } from '../../queries/user/signup'
import { type IUser } from '../../interfaces/models'
import { validateSignup } from '../../validation/auth/signup'

dotenv.config()

interface UserPayload {
  userId: number
  email: string
}

const { SECRET_KEY } = process.env

const signToken = (user: UserPayload): string => {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email
    },
    SECRET_KEY as Secret,
    {
      expiresIn: '1h'
    }
  )
  return token
}

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      userImage,
      profileImage,
      address,
      userType,
      status
    }: IUser = req.body

    await validateSignup(req.body)

    const existingUser = await User.findOne({ where: { email } })
    if (existingUser != null) {
      res.status(400).json({ error: 'Email already exists' })
      return
    }

    const newUser = await createUser({
      fullName,
      email,
      password,
      phone,
      userImage,
      profileImage,
      address,
      userType,
      status
    })

    const token = signToken({ userId: newUser.userId, email: newUser.email })

    res.cookie('token', token)

    res.json({
      message: 'Created successfully',
      data: {
        fullName,
        email: newUser.email,
        phone: newUser.phone,
        userImage,
        profileImage,
        address,
        userType,
        status
      }
    })
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ValidationError') {
      const validationErrors = (error as { errors: string[] }).errors.map((err: string) => ({
        message: err
      }))
      res.status(400).json({ error: 'Validation Error', details: validationErrors })
    } else {
      console.error('Error occurred during signup:', error)
      res.status(500).json({ error: 'Server Error' })
    }
  }
}

export { signup }
