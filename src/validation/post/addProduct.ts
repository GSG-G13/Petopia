import * as Yup from 'yup'
import { type IProduct } from '../../interfaces/fakeDataTypes'

const validateAddProduct = async (data: IProduct): Promise<IProduct> => {
  const schema = Yup.object().shape({
    post_id: Yup.number().required(),
    title: Yup.string().required('Product title is required'),
    price: Yup.number().required('Product price is required'),
    details: Yup.string(),
    rating: Yup.number()
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}
export default validateAddProduct
