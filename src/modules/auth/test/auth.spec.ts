import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { LoginDto, SignupDto, generateRandomSignupDto } from '../dtos/auth.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { CardsModule } from '../../cards/cards.module';
import { AuthModule } from '../auth.module';
import { TripsModule } from '../../trips/trips.module';
import { TransactionsModule } from '../../transactions/transactions.module';

import config from 'config';
import { environments } from 'environmens';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AuthController', () => {

  let controller: AuthController;
  let authService: AuthService;

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
        UsersModule,
        DatabaseModule,
        AuthModule,
        CardsModule,
        TripsModule,
        TransactionsModule
      ],exports:[
        JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: process.env.EXPIRED_IN },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  
  });

  describe('signup', () => {
    it('should return a valid JWT token on successful signup', async () => {
      
      const signupDto:SignupDto = generateRandomSignupDto();

      try {
      
          // Call the controller
          const { token } = await controller.signUp(signupDto);
       
          // Ensure the result contains a valid JWT token
          const decodedToken: any = await authService.verifyToken(token);

          // Assuming your token contains user information
          expect(decodedToken.email).toEqual(signupDto.email);


        } catch (error) {

          const exceptionMessages = {
            'User with this email already exists.': HttpStatus.CONFLICT,
            'User with same phone number already exists.': HttpStatus.CONFLICT,
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
  
  describe('signIn', () => {
    it('should return a token on successful login', async () => {
      // Arrange
      const loginDto: LoginDto = {
        email: 'driver@example.com',
        password: '123456789',
      };

      expect.assertions(1);

      try {
      
          // Call the controller
          const { token } = await controller.signIn(loginDto);
       
          // Ensure the result contains a valid JWT token
          const decodedToken: any = await authService.verifyToken(token);

          // Assuming your token contains user information
          expect(decodedToken.email).toEqual(loginDto.email);

        } catch (error) {

          const exceptionMessages = {
            'Password incorrect..': HttpStatus.BAD_REQUEST,
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
