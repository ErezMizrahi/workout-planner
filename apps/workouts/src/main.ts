import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WorkoutsModule } from './workouts.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkoutsModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
}
bootstrap();
