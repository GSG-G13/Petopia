import { Post } from '../../models'

const deletePostQuery = async (postId: number): Promise<number> => {
  const result = await Post.destroy(
    {
      where: { postId }
    }
  )
  return result
}
export default deletePostQuery
