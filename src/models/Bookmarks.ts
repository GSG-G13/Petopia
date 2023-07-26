import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IBookmarks } from '../interfaces/models'

const Bookmarks = sequelize.define<IBookmarks>('bookmarks', {
  bookmarksId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  postId: {
    type: DataTypes.INTEGER
  }
})

export default Bookmarks
