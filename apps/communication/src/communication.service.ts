import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CommunicationService {
  private readonly logger = new Logger(CommunicationService.name);

  getHello(): string {
    return 'Hello World!';
  }

  addToCalendar(data: any) {
    this.logger.log('adding to calendar', data);
    console.log()
  }
}
