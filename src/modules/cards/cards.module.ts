import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        Cards,
      ],
    ),
    UsersModule
  ],
  exports:[
    CardsService
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
