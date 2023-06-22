import sequelize from '../../database/config'

const showUserFollowingQuery = async (followingId: number): Promise<unknown[]> => {
  const [userFollowing] =
  await sequelize.query(`SELECT followers."followerId", followers."followingId", 
  users."userImage" AS "user.userImage", users."fullName"  AS "user.fullName"
  FROM followers 
  INNER JOIN users ON followers."followerId" = users."userId" 
  WHERE followers."followingId"
   = :followingId`, {
    replacements: { followingId }
  })
  return userFollowing
}

export default showUserFollowingQuery
