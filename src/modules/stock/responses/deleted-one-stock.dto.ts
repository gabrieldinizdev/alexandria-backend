import { ApiProperty } from '@nestjs/swagger';

import { StockStubWithDeletetAt } from '@/stubs/stock';

export class DeletedOneStockResponseDTO {
  @ApiProperty({
    example: StockStubWithDeletetAt,
  })
  public readonly data: typeof StockStubWithDeletetAt;
}
