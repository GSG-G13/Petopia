import { type IPost } from '../../interfaces/fakeDataTypes'
import { Post } from '../../models'

const addPostQuery = async (postData: IPost): Promise<number> => {
  const post = await Post.create(
    { ...postData },
    { returning: ['postId'] }
  )
  const postId = post?.postId
  return postId
}
export default addPostQuery
