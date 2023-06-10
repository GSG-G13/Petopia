import { Model, DataTypes } from 'sequelize';
import sequelize from './config';

class User extends Model {
  public user_id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public user_image!: string;
  public profile_image!: string;
  public address!: string;
  public phone!: string;
  public user_type!: string;
  public status!: string;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    user_image: {
      type: DataTypes.STRING,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    user_type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

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

class PostImage extends Model {
  public image_id!: number;
  public post_id!: number;
  public image_url!: string;
}

PostImage.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'PostImage',
    tableName: 'post_images',
  }
);

class Comment extends Model {
  public comment_id!: number;
  public user_id!: number;
  public post_id!: number;
  public comment_text!: string;
}

Comment.init(
  {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
    comment_text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
  }
);

class Like extends Model {
  public like_id!: number;
  public user_id!: number;
  public post_id!: number;
}

Like.init(
  {
    like_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    post_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
  }
);

class Follower extends Model {
    public follow_id!: number;
    public follower_id!: number;
    public following_id!: number;
  }
  
  Follower.init(
    {
      follow_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      follower_id: {
        type: DataTypes.INTEGER,
      },
      following_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Follower',
      tableName: 'followers',
    }
  );
  
  class PetType extends Model {
    public type_id!: number;
    public title!: string;
  }
  
  PetType.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'PetType',
      tableName: 'pet_types',
    }
  );
  
  class Category extends Model {
    public category_id!: number;
    public title!: string;
  }
  
  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
    }
  );
  
  class Product extends Model {
    public product_id!: number;
    public post_id!: number;
    public title!: string;
    public price!: number;
    public details!: string;
    public rating!: number;
  }
  
  Product.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      details: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      modelName: 'Product',
      tableName: 'products',
    }
  );
  
  class Pet extends Model {
    public pet_id!: number;
    public post_id!: number;
    public pet_name!: string;
    public pet_type!: number; 
    public age!: number;
    public gender!: string;
    public health_status!: string;
    public adoption_status!: string;
  }
  
  Pet.init(
    {
      pet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      post_id: {
        type: DataTypes.INTEGER,
      },
      pet_name: {
        type: DataTypes.STRING,
      },
      pet_type: {
        type: DataTypes.INTEGER, // Change the data type to INTEGER
      },
      age: {
        type: DataTypes.INTEGER,
      },
      gender: {
        type: DataTypes.STRING,
      },
      health_status: {
        type: DataTypes.STRING,
      },
      adoption_status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Pet',
      tableName: 'pets',
    }
  );
  
  
  export { User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet };