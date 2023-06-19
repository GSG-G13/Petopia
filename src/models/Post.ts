import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPost } from '../interfaces/models'

const Post = sequelize.define<IPost>('post', {
  postId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  categoryId: {
    type: DataTypes.INTEGER
  },
  postContent: {
    type: DataTypes.STRING
  },
  isHaveImg: {
    type: DataTypes.BOOLEAN
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default Post
