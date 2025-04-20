import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
  '${DB_NAME}',
  '${DB_USER}',
  '${DB_PASSWORD}',
  {
    host: '${DB_HOST}',
    dialect: 'postgres',
  }
);

