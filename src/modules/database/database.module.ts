/* eslint-disable no-unused-vars */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Config
 */

import { ConfigModule, ConfigType } from '@nestjs/config';
import config from 'config';
import { User } from '../users/users.entity';

/**
 * Entitys
 */


@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { database, port, password, user, host } =
          configService.database;
        return {
          type: 'postgres',
          host: `${host}`,
          port: 5432,
          database,
          username: user,
          password,
          synchronize: false,
          entities: [
            User
          ],
          autoLoadEntities: false,
          requestTimeout: 13000000,
          logging: false,
          extra: {
            trustServerCertificate: true,
          },
        };
      },
    })
  ],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class DatabaseModule {}
