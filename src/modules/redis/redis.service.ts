import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Redis, RedisOptions } from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  public constructor(private readonly configService: ConfigService) {
    const nodeENV = this.configService.getOrThrow('NODE_ENV');
    const tls = {
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: this.configService.getOrThrow('REDIS_PORT'),
    };

    const redisOptions: RedisOptions = {
      host: this.configService.getOrThrow('REDIS_HOST'),
      port: this.configService.getOrThrow('REDIS_PORT'),
      username: 'default',
      password: this.configService.getOrThrow('REDIS_PASSWORD'),
    };

    if (nodeENV === 'production') redisOptions.tls = tls;

    const redisClient = new Redis(redisOptions);

    this.redisClient = redisClient;
  }

  public save(key: string, value: Record<string, unknown>, expires?: number) {
    return this.redisClient.set(key, JSON.stringify(value), 'EX', expires);
  }

  public get(key: string) {
    return this.redisClient.get(key);
  }

  public async delete(key: string) {
    const deleted = await this.redisClient.del(key);
    return deleted === 1; // Return true if the key was deleted, false otherwise
  }
}
