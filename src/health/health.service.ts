import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  public constructor() {}

  public wakeUp(): boolean {
    return true;
  }
}
