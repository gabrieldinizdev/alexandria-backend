import { PartialType } from '@nestjs/swagger';

import { StockDTO } from './stock.dto';

export class UpdateStockDTO extends PartialType(StockDTO) {}
