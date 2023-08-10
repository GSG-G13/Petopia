import { Bookmarks } from '../../models'
import { type IBookmarks } from '../../interfaces/models'

const addBookmarksQuery = async (userId: number, postId: number): Promise<[IBookmarks, boolean]> => (
  await Bookmarks.findOrCreate({
    where: {
      userId, postId
    }
  })
)

export default addBookmarksQuery
