import { type IPostImage } from '../../interfaces/fakeDataTypes'
import { PostImage } from '../../models'

const addImageQuery = async (ImageData: IPostImage): Promise<IPostImage> => {
  const image = await PostImage.create(
    { ...ImageData }
  )
  return image
}
export default addImageQuery
