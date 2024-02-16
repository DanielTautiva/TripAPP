import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../transactions.service';
import { TransactionsController } from '../transactions.controller';

import { CreatePaymentSourceDto, CreateTransactionDto } from '../transactions.dtos';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transactions.entity';
import { CardsModule } from '../../cards/cards.module';

import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from 'src/config/data.source';
import { JwtModule } from '@nestjs/jwt';
import { environments } from 'environmens';
import config from 'config';


describe('TransactionsController', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[ 
        ConfigModule.forRoot({
          envFilePath: environments[process.env.NODE_ENV] || '.env',
          isGlobal: true,
          load: [config],
        }),
        TypeOrmModule.forRoot({ ...DataSourceConfig }),
        TypeOrmModule.forFeature(
          [
            Transaction,
          ],
        ),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: process.env.EXPIRED_IN },
        }),
        CardsModule,
      ],
      controllers: [TransactionsController],
      providers: [TransactionsService],
      exports: [
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: process.env.EXPIRED_IN },
        }),
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('createPaymentSource', () => {
    it('should return the correct response message and Payment Source', async () => {
      // Arrange
      const createPaymentSourceDto: CreatePaymentSourceDto = {
        type: 'CARD',
        customer_email: 'july@example.com',
      };
  
      let message;
  
      try {
        // Act
        const result = await service.createPaymentSource(createPaymentSourceDto);
        message = result.message;
        // Assert
        expect(message).toBe('Metodo de pago generado con exito!'); 
      } catch (error) {
        const exceptionMessages = {
          'Error al crear fuente de pago': HttpStatus.BAD_REQUEST,
        };
  
        if (error instanceof HttpException) {
          const expectedStatus = exceptionMessages[error.message] || HttpStatus.BAD_REQUEST;
          expect(error.getStatus()).toBe(expectedStatus);
        } else {
          throw error;
        }
      }
    }, 15000);
  });

  describe('createPay', () => {
    it('should return the correct response message and details of pay trip', async () => {
      // Arrange
      const createTransactionDto: CreateTransactionDto = {
        idTrip: 1,
        email: 'july@example.com',
        totalAmount: 6573,
      };
  
      let message;
  
      try {
        // Act
        const result = await service.createTransaction(createTransactionDto);
        message = result.message;
        // Assert
        expect(message).toBe('Pago generado con exito!'); 

      } catch (error) {
        throw error;    
      }
    }, 15000);
  });

});