import * as Yup from 'yup'
import { type IPostImage } from '../../interfaces/fakeDataTypes'

const validateAddImage = async (data: IPostImage): Promise<IPostImage> => {
  const schema = Yup.object().shape({
    postId: Yup.number().required(),
    imageUrl: Yup.string().required('image_url is required.')
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}
export default validateAddImage
