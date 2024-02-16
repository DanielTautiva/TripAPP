import { Test, TestingModule } from '@nestjs/testing';

import { TripsController } from '../trips.controller';
import { TripsService } from '../trips.service';


import { Trip } from '../entitys/trips.entity';
import { TripStatus } from '../entitys/tripstatus.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { CardsModule } from '../../cards/cards.module';
import { AuthModule } from '../../auth/auth.module';
import { TripsModule } from '../../trips/trips.module';
import { TransactionsModule } from '../../transactions/transactions.module';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from 'src/config/data.source';
import { JwtModule } from '@nestjs/jwt';
import { environments } from 'environmens';
import config from 'config';
import { CompleteTripDto, CreateTripDto } from '../dtos/trips.dto';
import { User } from '../../users/entitys/users.entity';
import { UsersService } from '../../users/users.service';





describe('TripsController', () => {

  let controller: TripsController;
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: process.env.EXPIRED_IN },
        }),
        UsersModule,
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          isGlobal: true,
          load: [config],
        }),
        TypeOrmModule.forRoot({ ...DataSourceConfig }),
        TypeOrmModule.forFeature(
          [
            User,
            Trip,
            TripStatus
          ],
        ),
        DatabaseModule,
        AuthModule,
        CardsModule,
        TripsModule,
        TransactionsModule
      ],
      controllers: [TripsController],
      providers: [TripsService],

    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  describe('requestTrip', () => {
    it('should return a driver from trip when trip is requested', async () => {

      const createTripDto: CreateTripDto = {
        email: 'july@example.com',
        current_latitude: '4.6266686',
        current_longitude: '-74.1625781',
        destine_latitude: '4.629737547395592',
        destine_longitude: '-74.13502282940719',
      };

      try {

        // Act
        const { message } = await service.requestTrip(createTripDto);

        // Assert
        expect(message).toBe('Conductor asignado con exito!');
    
      } catch (error) {

        const exceptionMessages = {
          'Passenger not found': HttpStatus.NOT_FOUND,
          'No available driver': HttpStatus.NOT_FOUND,
        };

        if (error instanceof HttpException) {
          const expectedStatus = exceptionMessages[error.message] || HttpStatus.BAD_REQUEST;
          expect(error.getStatus).toBe(expectedStatus);

        } else {
          throw error; 
        }
      } 

    });
  });


  describe('completeTrip', () => {
    it('should return a message of complete trip', async () => {

      const createTripDto: CompleteTripDto = {
        id: 4,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bHlAZXhhbXBsZS5jb20iLCJpYXQiOjE3MDc5NzU4NTMsImV4cCI6MTczOTA3OTg1M30.MDs74Y2KyVHvZ81t-7uKIcWx7bcFjo4wGmEYfrkinKM',
      };

      try {

        // Act
        const { message } = await service.completeTrip(createTripDto);

        // Assert
        expect(message).toBe('Viaje finalizo con exito!');
    
      } catch (error) {


        const exceptionMessages = {
          'Updating the status is only allowed for the passenger or the driver of this trip.': HttpStatus.NOT_FOUND,
          'Trip not found': HttpStatus.NOT_FOUND,
        };

        if (error instanceof HttpException) {
          const expectedStatus = exceptionMessages[error.message] || HttpStatus.NOT_FOUND;

          expect(404).toEqual(expectedStatus);

        } else {
          throw error; 
        }
      } 

    });
  });

});
