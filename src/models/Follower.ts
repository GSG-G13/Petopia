import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/config'

class Follower extends Model {
  public follow_id!: number
  public follower_id!: number
  public following_id!: number
}

Follower.init(
  {
    follow_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    follower_id: {
      type: DataTypes.INTEGER
    },
    following_id: {
      type: DataTypes.INTEGER
    }
  },
  {
    sequelize,
    modelName: 'Follower',
    tableName: 'followers'
  }
)

export default Follower
