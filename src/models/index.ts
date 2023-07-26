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
import Bookmarks from './Bookmarks'

User.hasMany(Post, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Post.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(PostImage, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
PostImage.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Comment.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Like, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Like.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(Like, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Like.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Follower, { foreignKey: 'followerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Follower.belongsTo(User, { as: 'followingUser', foreignKey: 'followerId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Follower, { foreignKey: 'followingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Follower.belongsTo(User, { as: 'followerUser', foreignKey: 'followingId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

User.hasMany(Bookmarks, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Bookmarks.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(Bookmarks, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Bookmarks.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(Product, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Product.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Post.hasMany(Pet, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Pet.belongsTo(Post, { foreignKey: 'postId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

PetType.hasMany(Pet, { foreignKey: 'type', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Pet.belongsTo(PetType, { foreignKey: 'type', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

Category.hasMany(Post, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Post.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

export { sequelize, User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet, Bookmarks }
