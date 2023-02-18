import { DataTypes, Sequelize } from 'sequelize';

import { Base } from '../Base/entity';

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

export const init = (sequelize: Sequelize) =>
  User.init(
    {
      mobilePhone: DataTypes.STRING,
      nickName: { type: DataTypes.STRING, allowNull: true },
      gender: { type: DataTypes.INTEGER, allowNull: true },
      avatar: { type: DataTypes.STRING, allowNull: true },
      roles: { type: DataTypes.JSON, allowNull: true },
    },
    { sequelize },
  );
