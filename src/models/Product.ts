import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IProduct } from '../interfaces/models'

const Product = sequelize.define<IProduct>('product', {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postId: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT
  },
  details: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.FLOAT
  }
})

export default Product
