import { InferAttributes } from 'sequelize';

import { Article } from '../service/Article/entity';
import { TableModel } from './Base';

export type ArticleData = InferAttributes<Article>;

export class ArticleModel extends TableModel<ArticleData> {
  baseURI = 'article';
}

export default new ArticleModel();
