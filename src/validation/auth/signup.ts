import * as Yup from 'yup'
import { type IUser } from '../../interfaces/fakeDataTypes'

const validateSignup = async (data: IUser): Promise<IUser> => {
  const schema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    phone: Yup.string().min(7).required('Phone is required'),
    userImage: Yup.string(),
    profileImage: Yup.string(),
    address: Yup.string(),
    userType: Yup.string(),
    status: Yup.string()
  })

  const result = await schema.validate(data, { abortEarly: false })
  return result
}

export { validateSignup }
