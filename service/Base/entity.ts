import { Model } from 'sequelize';

export abstract class Base extends Model {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt?: Date;
}
