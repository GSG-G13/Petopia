import { DataTypes } from 'sequelize'
import sequelize from '../database/config'
import { type IComment } from '../interfaces/models'

const Comment = sequelize.define<IComment>('comment', {
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  postId: {
    type: DataTypes.INTEGER
  },
  commentText: {
    type: DataTypes.STRING
  }
})

export default Comment
