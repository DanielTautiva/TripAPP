import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

/**
 * Entitys
 */

import { User } from 'src/modules/users/entitys/users.entity';
import { Cards } from 'src/modules/cards/cards.entity';
import { Trip } from 'src/modules/trips/entitys/trips.entity';
import { TripStatus } from 'src/modules/trips/entitys/tripstatus.entity';
import { Roles } from 'src/modules/users/entitys/roles.entity';
import { RolesByUser } from 'src/modules/users/entitys/rolesbyuser.entity';
import { Transaction } from 'src/modules/transactions/transactions.entity';

const configService = new ConfigService();

ConfigModule.forRoot({
    envFilePath: `.env`,
});

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('HOST'),
    port: configService.get('SQL_PORT'),
    username: configService.get('SQL_USERNAME'),
    password: configService.get('SQL_PASSWORD'),
    database: configService.get('DATABASE'),
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    extra: {
      trustServerCertificate: true,
    },
};

export const AppDS = new DataSource(DataSourceConfig);