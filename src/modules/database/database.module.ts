/* eslint-disable no-unused-vars */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Config
 */

import { ConfigModule, ConfigType } from '@nestjs/config';
import config from 'config';

/**
 * Entitys
 */

import { User } from '../users/entitys/users.entity';
import { Cards } from '../cards/cards.entity';
import { Trip } from '../trips/entitys/trips.entity';
import { TripStatus } from '../trips/entitys/tripstatus.entity';
import { Roles } from '../users/entitys/roles.entity';
import { RolesByUser } from '../users/entitys/rolesbyuser.entity';
import { Transaction } from '../transactions/transactions.entity';

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
            User,
            Cards,
            Trip,
            TripStatus,
            Roles,
            RolesByUser,
            Transaction
          ],
          migrationsRun: true,
          migrations: ["src/database/migrations/*{.ts,.js}"],
          cli: {
            migrationsDir: "src/database/migrations"
          },
          autoLoadEntities: false,
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
