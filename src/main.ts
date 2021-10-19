import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('tweetAoo')
    .setDescription("The tweetAoo api's description")
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const PORT = process.env.PORT || 3000;

  console.log('===PORT===', PORT);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT || 3000);
}
bootstrap();
