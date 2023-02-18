import { Guard } from '@authing/guard';
import { HTTPClient } from 'koajax';
import { observable } from 'mobx';
import { toggle } from 'mobx-restful';

import { User } from '../service/User/entity';
import { API_Host, TableModel } from './Base';

const { localStorage } = globalThis;

export const guard = new Guard({
  mode: 'modal',
  appId: process.env.NEXT_PUBLIC_AUTHING_APP_ID!,
});

export class UserModel extends TableModel<User> {
  baseURI = 'user';

  @observable
  session?: User = localStorage?.session && JSON.parse(localStorage.session);

  client = new HTTPClient({
    baseURI: `${API_Host}/api/`,
    responseType: 'json',
  }).use(({ request }, next) => {
    if (this.session?.token)
      request.headers = {
        ...request.headers,
        Authorization: `Bearer ${this.session.token}`,
      };
    return next();
  });

  saveSession(user: User) {
    localStorage.session = JSON.stringify(user);

    return (this.session = user);
  }

  @toggle('uploading')
  async signInAuthing(token: string) {
    const { body } = await this.client.post<User>(
      `${this.baseURI}/session/authing`,
      {},
      { Authorization: `Bearer ${token}` },
    );
    return this.saveSession(body!);
  }

  @toggle('uploading')
  async signOut() {
    await guard.logout();

    this.session = undefined;

    localStorage.clear();
  }
}

export default new UserModel();
