import { InferAttributes } from 'sequelize';

import { Article } from '../service/Article/entity';
import { TableModel } from './Base';
import userStore from './User';

export type ArticleData = InferAttributes<Article>;

export class ArticleModel extends TableModel<ArticleData> {
  client = userStore.client;
  baseURI = 'article';
}

export default new ArticleModel();
