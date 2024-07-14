import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  public constructor() {}

  public wakeUp(): boolean {
    this.logger.warn('wake up');

    return true;
  }
}
