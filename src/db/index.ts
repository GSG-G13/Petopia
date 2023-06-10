import sequelize from './config';
import { User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet } from './models';

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(PostImage, { foreignKey: 'post_id' });
PostImage.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Like, { foreignKey: 'user_id' });
Like.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Like, { foreignKey: 'post_id' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Follower, { foreignKey: 'follower_id' });
Follower.belongsTo(User, { foreignKey: 'follower_id' });

User.hasMany(Follower, { foreignKey: 'following_id' });
Follower.belongsTo(User, { foreignKey: 'following_id' });

Post.hasMany(Product, { foreignKey: 'post_id' });
Product.belongsTo(Post, { foreignKey: 'post_id' });

PetType.hasMany(Pet, { foreignKey: 'pet_type' });
Pet.belongsTo(PetType, { foreignKey: 'pet_type' });

Category.hasMany(Post, { foreignKey: 'category_id' });
Post.belongsTo(Category, { foreignKey: 'category_id' });

export { sequelize, User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet };
