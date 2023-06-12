import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IFollower } from '../interfaces/models'

const Follower = sequelize.define<IFollower>('follower', {
  follow_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  follower_id: {
    type: DataTypes.INTEGER
  },
  following_id: {
    type: DataTypes.INTEGER
  }
})

export default Follower
