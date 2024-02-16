import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from './cards.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRED_IN },
    }),
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
