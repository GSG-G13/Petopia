import { Post, Category, User } from '../../models'

interface IStats {
  postsCount: number
  categoriesCount: number
  usersCount: number
}

const getStatsQuery = async (): Promise<IStats> => {
  const postsCount = await Post.count()
  const categoriesCount = await Category.count()
  const usersCount = await User.count()
  return { postsCount, categoriesCount, usersCount }
}
export default getStatsQuery
