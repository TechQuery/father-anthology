import { JwtPayload, verify } from 'jsonwebtoken';

import { readyDB } from '../../../../service/database';
import { Role, User } from '../../../../service/User/entity';
import { safeAPI } from '../../core';

export type AuthingAddress = Partial<
  Record<'country' | 'postal_code' | 'region' | 'formatted', string>
>;

export type AuthingUser = Record<
  'type' | 'userPoolId' | 'appId' | 'id' | '_id' | 'userId' | 'clientId',
  string
> &
  Partial<
    Record<'email' | 'phone' | 'username' | 'unionid' | 'openid', string>
  >;

export interface AuthingSession
  extends JwtPayload,
    Pick<AuthingUser, 'username' | 'unionid'>,
    Record<'userpool_id' | 'gender' | 'picture', string>,
    Partial<
      Record<
        | 'external_id'
        | 'email'
        | 'website'
        | 'phone_number'
        | 'name'
        | 'preferred_username'
        | 'nickname'
        | 'family_name'
        | 'middle_name'
        | 'given_name'
        | 'birthdate'
        | 'locale'
        | 'zoneinfo',
        string
      >
    > {
  phone_number_verified: boolean;
  email_verified: boolean;

  data: AuthingUser;
  profile?: any;
  address: AuthingAddress;

  updated_at: Date;
}

const AUTHING_APP_SECRET = process.env.AUTHING_APP_SECRET!;

export default safeAPI(
  async ({ method, headers: { authorization } }, response) => {
    await readyDB;

    switch (method) {
      case 'POST': {
        if (!authorization) {
          response.status(401);
          return response.end();
        }
        const [type, token] = authorization.split(/\s+/);

        const {
          phone_number: mobilePhone,
          nickname,
          picture,
        } = verify(token, AUTHING_APP_SECRET) as AuthingSession;

        const oldUser = await User.findOne({ where: { mobilePhone } });

        if (oldUser) {
          await oldUser.update({ nickname, picture });

          return response.json(oldUser);
        }
        const sum = await User.count();

        const newUser = await User.create({
          mobilePhone,
          nickname,
          picture,
          roles: [sum ? Role.Reader : Role.Editor],
        });
        response.json(newUser);
      }
    }
  },
);
