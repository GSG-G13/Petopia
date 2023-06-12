import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class Comment extends Model {
  public comment_id!: number
  public user_id!: number
  public post_id!: number
  public comment_text!: string
}

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    comment_text: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments'
  }
)

export default Comment
