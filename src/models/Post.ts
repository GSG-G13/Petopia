import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPost } from '../interfaces/models'

const Post = sequelize.define<IPost>('post', {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  category_id: {
    type: DataTypes.INTEGER
  },
  post_content: {
    type: DataTypes.STRING
  },
  is_have_img: {
    type: DataTypes.BOOLEAN
  }
})

export default Post
