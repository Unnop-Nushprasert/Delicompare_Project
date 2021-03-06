import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/images/',
  });
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors(); 
  await app.listen(3000);
}
bootstrap();
