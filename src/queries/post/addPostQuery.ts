import { type IPost } from '../../interfaces/fakeDataTypes'
import { Post } from '../../models'

const addPostQuery = async (postData: IPost): Promise<number> => {
  const post = await Post.create(
    { ...postData, likesCount: 0, commentsCount: 0 },
    { returning: ['postId'] }
  )
  const postId = post?.postId
  return postId
}
export default addPostQuery
