import { Bookmarks } from '../../models'
import { type IBookmarks } from '../../interfaces/models'

const getBookmarkersQuery = async (postId: number): Promise<IBookmarks[]> => {
  const Bookmarkers = await Bookmarks.findAll({
    where: { postId }
  })
  return Bookmarkers
}

export default getBookmarkersQuery
