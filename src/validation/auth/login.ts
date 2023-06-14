import { object, string } from 'yup'

const loginSchema = object({
  email: string().email().required(),
  password: string().min(5).required()
})

export { loginSchema }
