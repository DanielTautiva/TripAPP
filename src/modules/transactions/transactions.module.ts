import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Transaction } from './transactions.entity';
import { CardsModule } from '../cards/cards.module';

@Module({
  imports:[ 
    TypeOrmModule.forFeature(
      [
        Transaction,
      ],
    ),
    CardsModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
