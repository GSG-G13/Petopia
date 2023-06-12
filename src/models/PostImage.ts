import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPostImage } from '../interfaces/models'

const PostImage = sequelize.define<IPostImage>('postImage', {
  image_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  post_id: {
    type: DataTypes.INTEGER
  },
  image_url: {
    type: DataTypes.STRING
  }
})

export default PostImage
