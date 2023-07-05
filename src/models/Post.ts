import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPostWithDetails } from '../interfaces/iPosts'

const Post = sequelize.define<IPostWithDetails>('post', {
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
    type: DataTypes.TEXT
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
