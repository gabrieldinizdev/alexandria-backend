import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  public constructor(private readonly healthService: HealthService) {}

  @Get('wake-up')
  public wakeUp(): boolean {
    return this.healthService.wakeUp();
  }
}
