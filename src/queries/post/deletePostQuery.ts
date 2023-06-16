import { Post } from '../../models'

const deletePostQuery = async (postId: number): Promise<number> => {
  const post = await Post.destroy(
    { where: { postId } }
  )
  return post
}
export default deletePostQuery
