import { Injectable } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class StockService {
  public constructor(private readonly prismaService: PrismaService) {}
}
