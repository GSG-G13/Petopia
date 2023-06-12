import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class PostImage extends Model {
  public image_id!: number
  public post_id!: number
  public image_url!: string
}

PostImage.init(
  {
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
  },
  {
    sequelize,
    modelName: 'PostImage',
    tableName: 'post_images'
  }
)

export default PostImage
