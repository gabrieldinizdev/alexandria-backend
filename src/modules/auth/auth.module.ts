import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { NodemailerModule, RedisModule } from '@/shared/providers';

import { CustomersModule } from '../customers/customers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),

    CustomersModule,
    RedisModule,
    NodemailerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
