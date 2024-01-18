import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'environmens';
import config from 'config';
/**
 * Modules
 */
import { DatabaseModule } from './modules/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CardsModule } from './modules/cards/cards.module';
import { TripsModule } from './modules/trips/trips.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    CardsModule,
    TripsModule,
    TransactionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
