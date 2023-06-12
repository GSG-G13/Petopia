import { DataTypes } from 'sequelize'
import sequelize from '../database/config'
import { type IComment } from '../interfaces/models'

const Comment = sequelize.define<IComment>('comment', {
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
})

export default Comment
