import * as Yup from 'yup'
import { type IPet } from '../../interfaces/fakeDataTypes'

const addPetValidation = async (data: IPet): Promise<IPet> => {
  const schema = Yup.object().shape({
    postId: Yup.number().required(),
    petName: Yup.string().required('Pet name is required'),
    type: Yup.number().required('Pet type is required'),
    age: Yup.number().required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    healthStatus: Yup.string().required('Health status is required'),
    adoptionStatus: Yup.string().required('Adoption status is required')
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}
export default addPetValidation
