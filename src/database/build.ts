import dotenv from 'dotenv'
import sequelize from './config'
import fakeData from './fakeData'
import {
  User, Post, PostImage, Comment, Like, Follower, PetType, Category, Product, Pet, Bookmarks
} from '../models'

dotenv.config()
const SEED = process.env.SEED

const buildTables = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true })
    await User.bulkCreate(fakeData.users)
    await Category.bulkCreate(fakeData.categories)
    await PetType.bulkCreate(fakeData.petTypes)
    await Post.bulkCreate(fakeData.posts)
    await PostImage.bulkCreate(fakeData.postImages)
    await Comment.bulkCreate(fakeData.comments)
    await Bookmarks.bulkCreate(fakeData.bookmarks)
    await Like.bulkCreate(fakeData.likes)
    await Follower.bulkCreate(fakeData.followers)
    await Product.bulkCreate(fakeData.products)
    await Pet.bulkCreate(fakeData.pets)
  } catch (error) {
    console.log(`error in building data: ${String(error)}`)
  }
}

if (SEED !== null && SEED !== undefined) {
  buildTables().then(() => { console.log('Database built successfully') })
    .catch(err => { console.log(`error in building data: ${String(err)}`) })
}

export default buildTables
