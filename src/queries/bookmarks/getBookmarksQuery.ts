import sequelize from 'sequelize'
import { Category, Pet, PetType, Bookmarks, PostImage, Product, User, Post } from '../../models'
import { type IBookmarksWithPosts } from '../../interfaces/IBookmarks'

const getBookmarksQuery = async (userId: number): Promise<IBookmarksWithPosts[]> => {
  const posts = await Bookmarks.findAll({
    where: { userId },
    include: [
      {
        model: Post,
        include: [
          {
            model: PostImage
          },
          {
            model: Category,
            attributes: ['title']
          },
          {
            model: User,
            attributes: ['userId', 'fullName', 'userImage', 'phone']
          },
          {
            model: Product
          },
          {
            model: Pet,
            include: [{ model: PetType, attributes: ['title'] }]
          }
        ],
        attributes: {
          include: [
            [
              sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes."postId" = post."postId")'),
              'likeCount'
            ],
            [
              sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments."postId" = post."postId")'),
              'commentCount'
            ]
          ]
        },
        order: [['createdAt', 'DESC']],
        subQuery: false
      }
    ]
  })
  return posts
}

export default getBookmarksQuery
