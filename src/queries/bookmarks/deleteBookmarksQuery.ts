import { Bookmarks } from '../../models'

const deleteBookmarksQuery = async (userId: number, postId: number): Promise<number> => (
  await Bookmarks.destroy({
    where: {
      userId, postId
    }
  })
)

export default deleteBookmarksQuery
