/* eslint-disable no-unused-vars */
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * Config
 */

import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from 'src/config/data.source';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig })
  ],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class DatabaseModule {}
