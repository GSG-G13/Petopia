import * as Yup from 'yup'
import { type IPet } from '../../interfaces/fakeDataTypes'

const addPetValidation = async (data: IPet): Promise<IPet> => {
  const schema = Yup.object().shape({
    post_id: Yup.number().required(),
    pet_name: Yup.string().required('Pet name is required'),
    pet_type: Yup.number().required('Pet type is required'),
    age: Yup.number().required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    health_status: Yup.string().required('Health status is required'),
    adoption_status: Yup.string().required('Adoption status is required')
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}
export default addPetValidation
