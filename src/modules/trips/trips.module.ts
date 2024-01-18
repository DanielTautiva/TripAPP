import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Trip } from './entitys/trips.entity';
import { TripStatus } from './entitys/tripstatus.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature(
      [
        Trip,
        TripStatus
      ],
    ),
    UsersModule
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
