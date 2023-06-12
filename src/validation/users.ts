import { object, string } from 'yup'

const loginSchema = object({
  email: string().email(),
  password: string().min(5).required()
})

export { loginSchema }
