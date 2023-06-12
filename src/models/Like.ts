import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/config'

class Like extends Model {
  public like_id!: number
  public user_id!: number
  public post_id!: number
}

Like.init(
  {
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
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes'
  }
)

export default Like
