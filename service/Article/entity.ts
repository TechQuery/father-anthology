import { DataTypes } from 'sequelize';

import { Base } from '../Base/entity';
import { sequelize } from '../database';

export class Article extends Base {
  declare title: string;
  declare image?: string;
  declare author: string;
  declare location?: string;
  declare tags: string;
  declare summary?: string;
  declare content: string;
}

Article.init(
  {
    title: DataTypes.STRING,
    image: { type: DataTypes.TEXT, allowNull: true },
    author: DataTypes.STRING,
    location: { type: DataTypes.STRING, allowNull: true },
    tags: DataTypes.STRING,
    summary: { type: DataTypes.TEXT, allowNull: true },
    content: DataTypes.TEXT,
  },
  { sequelize },
);
