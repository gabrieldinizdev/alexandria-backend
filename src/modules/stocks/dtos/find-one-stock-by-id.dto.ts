import { PickType } from '@nestjs/swagger';

import { StockDTO } from './stock.dto';

export class FindOneStockByIdDTO extends PickType(StockDTO, ['id'] as const) {}
