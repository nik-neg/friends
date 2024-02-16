import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    // DatabaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // TODO: config service
      database: 'user_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: ['src/entities/*{.js,.ts}'],
    }),
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // constructor(
  //   @InjectDataSource('DATA_SOURCE')
  //   private dataSource: DataSource,
  // ) {
  //   // console.log('AppModule.constructor()');
  //   // console.log('dataSource:', dataSource);
  // }
}
