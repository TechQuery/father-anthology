import { HTTPClient } from 'koajax';
import { DataObject, Filter, ListModel } from 'mobx-restful';
import { buildURLData } from 'web-utility';

import { ListChunk } from '../service/database';

export const isServer = () => typeof window === 'undefined';

const VercelHost = process.env.VERCEL_URL,
  GithubToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const API_Host = isServer()
  ? VercelHost
    ? `https://${VercelHost}`
    : 'http://localhost:3000'
  : globalThis.location.origin;

export const ownClient = new HTTPClient({
  baseURI: `${API_Host}/api/`,
  responseType: 'json',
});

export const githubClient = new HTTPClient({
  baseURI: 'https://api.github.com/',
  responseType: 'json',
}).use(({ request }, next) => {
  if (GithubToken)
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${GithubToken}`,
    };
  return next();
});

export abstract class TableModel<
  D extends DataObject,
  F extends Filter<D> = Filter<D>,
> extends ListModel<D, F> {
  client = ownClient;

  async loadPage(pageIndex = 1, pageSize = 10, filter: F) {
    const { body } = await this.client.get<ListChunk<D>>(
      `${this.baseURI}?${buildURLData({ pageIndex, pageSize, ...filter })}`,
    );
    return { pageData: body!.rows, totalCount: body!.count };
  }
}
