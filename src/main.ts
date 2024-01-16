import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';


import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Auto-transformar solicitudes a DTOs
      whitelist: true, // Eliminar propiedades adicionales de DTOs
      forbidNonWhitelisted: true, // Lanzar error si hay propiedades no permitidas
    }),
  ); 

  app.use(helmet());
  app.use(compression());

  const config = new DocumentBuilder()
    .setTitle('TRIP API Documentation')
    .setDescription('The TRIP API description')
    .setVersion('1.0')
    .addServer('/api')
    .addTag('TRIP')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.setGlobalPrefix('api');


  await app.listen(process.env.APP_PORT, () => {
    Logger.debug('Env in ' + process.env.ENV);
  });

}
bootstrap();
