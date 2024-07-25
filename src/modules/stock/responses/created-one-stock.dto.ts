import { ApiProperty } from '@nestjs/swagger';

import { StockStub } from '@/stubs/stock';

export class CreatedOneStockResponseDTO {
  @ApiProperty({
    example: StockStub,
  })
  public readonly data: typeof StockStub;
}
