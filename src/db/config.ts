import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_DATABASE!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST!,
  dialect: DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  logging: false, 
});

export default sequelize;
