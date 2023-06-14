import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IUser } from '../interfaces/models'

const User = sequelize.define<IUser>('user', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userImage: {
    type: DataTypes.STRING
  },
  profileImage: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  userType: {
    type: DataTypes.STRING,
    defaultValue: 'regular',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'deactive'),
    defaultValue: 'active',
    allowNull: false
  }
})

export default User
