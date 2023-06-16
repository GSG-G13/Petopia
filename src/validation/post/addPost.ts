import * as Yup from 'yup'
import { type IPost } from '../../interfaces/fakeDataTypes'

const validateAddPost = async (data: IPost): Promise<IPost> => {
  const schema = Yup.object().shape({
    userId: Yup.number().required(),
    categoryId: Yup.number().required('Post Category is required.'),
    postContent: Yup.string().required('Content is required.'),
    isHaveImg: Yup.boolean().required()
  })
  const result = await schema.validate(data, { abortEarly: false })
  return result
}
export default validateAddPost
