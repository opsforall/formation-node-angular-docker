import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
  process.env.APP_DB_NAME, 
  process.env.APP_DB_USER,
  process.env.APP_DB_PASS, 
  {
    host: process.env.DB_HOST, 
    dialect: process.env.DB_DIALECT, 
  }
);

