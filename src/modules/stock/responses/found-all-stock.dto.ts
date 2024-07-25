import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';

import { StockDTO } from '../dtos';

export class FoundAllStockResponseDTO {
  @ApiProperty({ type: StockDTO, isArray: true })
  public readonly data: StockDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
