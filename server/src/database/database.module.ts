import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { userProviders } from '../user/user.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
