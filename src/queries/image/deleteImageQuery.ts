import { PostImage } from '../../models'

const deleteImageQuery = async (postId: number): Promise<number> => {
  const destroyResult = await PostImage.destroy(
    {
      where: { postId }
    }
  )
  return destroyResult
}
export default deleteImageQuery
