import { DataTypes } from 'sequelize';

import { Base } from '../Base/entity';
import { sequelize } from '../database';

export enum Gender {
  Female,
  Male,
  Other,
}

export enum Role {
  Editor,
  Reader,
}

export class User extends Base {
  declare mobilePhone: string;
  declare nickName?: string;
  declare gender?: Gender;
  declare avatar?: string;
  declare roles?: Role[];
  declare token?: string;
}

User.init(
  {
    mobilePhone: DataTypes.STRING,
  },
  { sequelize },
);
