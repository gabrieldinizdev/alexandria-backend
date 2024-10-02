import { OmitType, PartialType } from '@nestjs/swagger';

import { StockDTO } from './stock.dto';

export class UpdateOneStockByIdDTO extends PartialType(
  OmitType(StockDTO, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
