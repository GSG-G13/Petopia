import sequelize from '../database/config'
import User from './User'
import Post from './Post'
import PostImage from './PostImage'
import Comment from './Comment'
import Like from './Like'
import Follower from './Follower'
import PetType from './PetType'
import Category from './Category'
import Product from './Product'
import Pet from './Pet'

User.hasMany(Post, { foreignKey: 'userId' })
Post.belongsTo(User, { foreignKey: 'userId' })

Post.hasMany(PostImage, { foreignKey: 'postId' })
PostImage.belongsTo(Post, { foreignKey: 'postId' })

User.hasMany(Comment, { foreignKey: 'userId' })
Comment.belongsTo(User, { foreignKey: 'userId' })

Post.hasMany(Comment, { foreignKey: 'postId' })
Comment.belongsTo(Post, { foreignKey: 'postId' })

User.hasMany(Like, { foreignKey: 'userId' })
Like.belongsTo(User, { foreignKey: 'userId' })

Post.hasMany(Like, { foreignKey: 'postId' })
Like.belongsTo(Post, { foreignKey: 'postId' })

User.hasMany(Follower, { foreignKey: 'followerId' })
Follower.belongsTo(User, { foreignKey: 'followerId' })

User.hasMany(Follower, { foreignKey: 'followingId' })
Follower.belongsTo(User, { foreignKey: 'followingId' })

Post.hasMany(Product, { foreignKey: 'postId' })
Product.belongsTo(Post, { foreignKey: 'postId' })

PetType.hasMany(Pet, { foreignKey: 'petType' })
Pet.belongsTo(PetType, { foreignKey: 'petType' })

Category.hasMany(Post, { foreignKey: 'categoryId' })
Post.belongsTo(Category, { foreignKey: 'categoryId' })

export { sequelize, User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet }
