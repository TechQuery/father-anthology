import { ArticleData } from '../service/Article/entity';
import { TableModel } from './Base';
import userStore from './User';

export class ArticleModel extends TableModel<ArticleData> {
  client = userStore.client;
  baseURI = 'article';
}

export default new ArticleModel();
