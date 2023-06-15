import { type IPost } from '../../interfaces/fakeDataTypes'
import { Post } from '../../models'

const addPostQuery = async (postData: IPost): Promise<number> => {
  const post = await Post.create(
    { ...postData },
    { returning: ['post_id'] }
  )
  const postId = post?.post_id
  return postId
}
export default addPostQuery
