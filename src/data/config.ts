import { DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Group } from './entities/group.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Group],
  migrations: [],
  subscribers: [],
};
