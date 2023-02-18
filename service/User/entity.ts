import { DataTypes, Sequelize } from 'sequelize';

import { Base } from '../Base/entity';

export enum Gender {
  Female = '0',
  Male = '1',
  Other = '2',
}

export enum Role {
  Editor = '0',
  Reader = '1',
}

export class User extends Base {
  declare mobilePhone: string;
  declare nickName?: string;
  declare gender?: Gender;
  declare avatar?: string;
  declare roles?: Role[];
  declare token?: string;
}

export const init = (sequelize: Sequelize) =>
  User.init(
    {
      mobilePhone: DataTypes.STRING,
      nickName: { type: DataTypes.STRING, allowNull: true },
      gender: {
        type: DataTypes.ENUM(Gender.Female, Gender.Male, Gender.Other),
        allowNull: true,
      },
      avatar: { type: DataTypes.STRING, allowNull: true },
      roles: { type: DataTypes.JSON, allowNull: true },
    },
    { sequelize },
  );
