import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IFollower } from '../interfaces/models'

const Follower = sequelize.define<IFollower>('follower', {
  followId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerId: {
    type: DataTypes.INTEGER
  },
  followingId: {
    type: DataTypes.INTEGER
  }
})

export default Follower
