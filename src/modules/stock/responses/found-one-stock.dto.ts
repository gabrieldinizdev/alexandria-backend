import { ApiProperty } from '@nestjs/swagger';

import { StockStub } from '@/stubs';

export class FoundOneStockByIdResponseDTO {
  @ApiProperty({
    example: StockStub,
  })
  public readonly data: typeof StockStub;
}
