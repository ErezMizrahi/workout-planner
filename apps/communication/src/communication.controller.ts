import { JWTAuthGuard, RmqService } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CommunicationService } from './communication.service';

@Controller()
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService, 
    private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.communicationService.getHello();
  }

  @UseGuards(JWTAuthGuard)
  @EventPattern('workout_created')
  async handleWorkoutCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.communicationService.addToCalendar(data);
    this.rmqService.ack(context) // remove messages only if there is no error
  }
}
