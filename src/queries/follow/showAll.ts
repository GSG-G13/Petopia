import Follower from '../../models/Follower'
import { type IFollower } from '../../interfaces/models'

const getUserFolowers = async (): Promise<IFollower[]> => {
  const userFolowers = await Follower.findAll()

  return userFolowers
}

export { getUserFolowers }
