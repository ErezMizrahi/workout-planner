import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { CommunicationModule } from './communication.module';

async function bootstrap() {
  const app = await NestFactory.create(CommunicationModule);
  const rmqService = app.get<RmqService>(RmqService)
  app.connectMicroservice(rmqService.getOptions('COMMUNICATION'));
  await app.startAllMicroservices();
}
bootstrap();
