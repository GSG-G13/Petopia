import { type IPost } from '../../interfaces/fakeDataTypes'
import { Post } from '../../models'

const updatePostQuery = async (postId: number, postData: IPost): Promise<IPost | null> => {
  const [count, [updatedPost]] = await Post.update(
    { ...postData },
    {
      where: { postId },
      returning: true
    }
  )
  if (count === 0) {
    return null
  }
  return updatedPost
}
export default updatePostQuery
