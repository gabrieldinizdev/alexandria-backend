import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomersModule } from '@/modules/customer/customer.module';

import { RedisModule } from '../../cache/redis/redis.module';
import { NodemailerService } from './nodemailer.service';

@Module({
  imports: [CustomersModule, RedisModule, ConfigModule],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
