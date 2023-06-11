import { Model, DataTypes } from 'sequelize';
import sequelize from '../config';

class Post extends Model {
    public post_id!: number;
    public user_id!: number;
    public category_id!: string;
    public post_content!: string;
    public is_have_img!: boolean;
  }
  
  Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      post_content: {
        type: DataTypes.STRING,
      },
      is_have_img: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
    }
  );
  

export default Post;
