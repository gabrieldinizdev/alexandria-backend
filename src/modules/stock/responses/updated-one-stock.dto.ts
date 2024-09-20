import { ApiProperty } from '@nestjs/swagger';

import { StockStub } from '@/stubs';

export class UpdatedOneStockResponseDTO {
  @ApiProperty({
    example: StockStub,
  })
  public readonly data: typeof StockStub;
}
