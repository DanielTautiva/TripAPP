import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, 
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  ); 

  app.use(helmet());
  app.use(compression());
  app.enableCors({ origin: '*' });
  app.use(cookieParser());

  app.use(
    csurf({
      cookie: {
        httpOnly: true,
        sameSite: true,
        secure: true,
        key: 'authorization',
      },
      ignoreMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('TRIP API Documentation')
    .setDescription('The TRIP API description')
    .setVersion('1.0')
    .addTag('TRIP')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.APP_PORT, () => {
    Logger.debug(`Application running on: ${process.env.APP_PORT} Env in: ${process.env.ENV}`);
  });

}
bootstrap();