import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from '../cards.controller';
import { CardsService } from '../cards.service';
import { CreateCardDto, DtoResCards, DtoResTokenizador, GetCardDto } from '../dtos/cards.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from '../cards.entity';
import { UsersModule } from '../../users/users.module';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceConfig } from 'src/config/data.source';
import { JwtModule } from '@nestjs/jwt';
import { environments } from 'environmens';
import config from 'config';

describe('CardsController', () => {

  let cardsController: CardsController;
  let cardsService: CardsService;

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
            Cards,
          ],
        ),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: process.env.EXPIRED_IN },
        }),
        UsersModule
      ],
      controllers: [CardsController],
      providers: [CardsService],
      exports:[CardsService],
    }).compile();


    cardsController = module.get<CardsController>(CardsController);
    cardsService = module.get<CardsService>(CardsService);
  });

  describe('createCard', () => {
    it('should create a new credit card tokenized and return a response object', async () => {
      
      const createCardDto: CreateCardDto = {
        email: 'driver@example.com',
        number: '4242424242424242',
        exp_month: '12',
        exp_year: '25',
        cvc: '123',
        card_holder: 'John Doe',
      };

      try {
        // Act
        const result: DtoResTokenizador = await cardsController.createCard(createCardDto);

        // Assert
        expect(result.message).toBe('Tarjeta creada exitosamente');
    
      } catch (error) {

        const exceptionMessages = {
          'Error al crear tarjeta en Wompi': HttpStatus.BAD_REQUEST,
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


  describe('getCard', () => {
    it('should return all credit card tokenized of a user email and return a response object', async () => {
      
      const getCardDto: GetCardDto = {
        email: 'driver@example.com',
      };


      try {
        // Act
        const result: DtoResCards = await cardsController.getUserCards(getCardDto);

        // Assert
        expect(result.message).toBe('Tarjetas del usuario');
    
      } catch (error) {

        const exceptionMessages = {
          'Error al consultar la informacion del usuario': HttpStatus.BAD_REQUEST,
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
});