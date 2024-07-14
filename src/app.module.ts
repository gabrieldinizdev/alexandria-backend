import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      cache: true,
      envFilePath: '.env',
    }),
    HealthModule,
  ],
})
export class AppModule {}
