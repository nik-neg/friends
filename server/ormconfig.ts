import * as process from 'process';

export = {
  host: process.env.HOST,
  type: 'postgres',
  port: process.env.PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: false,
};
