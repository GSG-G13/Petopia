import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type ILike } from '../interfaces/models'

const Like = sequelize.define<ILike>('like', {
  likeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  postId: {
    type: DataTypes.INTEGER
  }
})

export default Like
