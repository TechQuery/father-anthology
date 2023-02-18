import { Article } from '../../../service/Article/entity';
import { readyDB } from '../../../service/database';
import { safeAPI } from '../core';

export default safeAPI(async ({ method, query: { id } }, response) => {
  switch (method) {
    case 'GET': {
      await readyDB;

      const data = await Article.findByPk(+id!);

      response.json(data);
    }
  }
});
