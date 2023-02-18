import { Sequelize } from 'sequelize';

const NODE_ENV = process.env.NODE_ENV,
  DATABASE_URL = process.env.DATABASE_URL!;

export const isProduct = NODE_ENV === 'production';

export const sequelize = isProduct
  ? new Sequelize(DATABASE_URL)
  : new Sequelize({ dialect: 'sqlite', storage: '.data/test.db' });

export const readyDB = (async () => {
  await sequelize.authenticate();

  await sequelize.sync({ alter: true });
})();

export interface ListChunk<T> {
  rows: T[];
  count: number;
}
