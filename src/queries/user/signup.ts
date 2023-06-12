import bcrypt from 'bcrypt'
import User from '../../models/User'
import { type IUser } from '../../interfaces/models'

interface CreateUserProps {
  fullName: string
  email: string
  password: string
  phone: string
  userImage: string
  profileImage: string
  address: string
  userType: string
  status: string
}

const createUser = async ({
  fullName,
  email,
  password,
  phone,
  userImage,
  profileImage,
  address,
  userType,
  status
}: CreateUserProps): Promise<IUser> => {
  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    phone,
    userImage,
    profileImage,
    address,
    userType,
    status
  })

  return newUser
}

export { createUser }
