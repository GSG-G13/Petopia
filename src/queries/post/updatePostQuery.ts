import { type IPost } from '../../interfaces/fakeDataTypes'
import { Post } from '../../models'

const updatePostQuery = async (postId: number, postData: IPost): Promise<IPost> => {
  const [, [updatedPost]] = await Post.update(
    postData,
    {
      where: { postId },
      returning: true
    }
  )

  return updatedPost
}
export default updatePostQuery
