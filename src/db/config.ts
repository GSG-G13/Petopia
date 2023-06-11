import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {  DATABASE_URL } = process.env;

const sequelize = new Sequelize(DATABASE_URL!, {
  logging: false,
});

export default sequelize;
