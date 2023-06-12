import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type ILike } from '../interfaces/models'

const Like = sequelize.define<ILike>('like', {
  like_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  post_id: {
    type: DataTypes.INTEGER
  }
})

export default Like
