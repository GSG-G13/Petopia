import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPostImage } from '../interfaces/models'

const PostImage = sequelize.define<IPostImage>('postImage', {
  imageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postId: {
    type: DataTypes.INTEGER
  },
  imageUrl: {
    type: DataTypes.STRING
  }
})

export default PostImage
