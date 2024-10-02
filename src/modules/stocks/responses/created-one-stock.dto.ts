import { ApiProperty } from '@nestjs/swagger';

import { StockStub } from '@/stubs';

export class CreatedOneStockResponseDTO {
  @ApiProperty({
    example: StockStub,
  })
  public readonly data: typeof StockStub;
}
