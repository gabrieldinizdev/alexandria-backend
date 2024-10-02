import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { StockDTO } from './stock.dto';

class DefaultCreatedStockDTO extends PickType(StockDTO, ['name'] as const) {}

class NewCreateStockDTO extends PickType(StockDTO, ['name'] as const) {
  @IsNotEmpty()
  public readonly name: string;
}

export class CreateOneStockDTO extends IntersectionType(
  DefaultCreatedStockDTO,
  NewCreateStockDTO,
) {}
