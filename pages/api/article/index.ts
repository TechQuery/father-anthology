import { Article } from '../../../service/Article/entity';
import { readyDB } from '../../../service/database';
import { safeAPI } from '../core';

export default safeAPI(async ({ method, query }, response) => {
  switch (method) {
    case 'GET': {
      const { pageIndex = 1, pageSize = 10, ...filter } = query;

      await readyDB;

      const data = await Article.findAndCountAll({
        where: filter,
        offset: (+pageIndex! - 1) * +pageSize!,
        limit: +pageSize!,
      });
      response.json(data);
    }
  }
});
