import sequelize from 'sequelize'
// import { type IPostImage, type IPost, type ICategory } from '../../interfaces/models'
import { Category, Post, PostImage, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'

const gePostQuery = async (id: number): Promise<IPostWithDetails | null> => {
  try {
    const post = await Post.findOne({
      where: { post_id: id },
      include: [
        {
          model: PostImage,
        },
        {
          model: Category,
        },
        {
          model: User,
          attributes: ['userId', 'fullName', 'userImage'],
        },
      ],
      attributes: {
        include: [
          [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.post_id = post.post_id)'), 'likeCount'],
          [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.post_id)'), 'commentCount'],
        ],
      },
      group: ['post.post_id', 'user.userId', 'postImages.image_id', 'category.category_id'],
    })

    return post
  } catch (error) {
    console.error('Error retrieving post:', error)
    return null
  }
}

export default gePostQuery
