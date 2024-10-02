import { ApiProperty } from '@nestjs/swagger';

import { StockStubWithDeletedAt } from '@/stubs';

export class DeletedOneStockResponseDTO {
  @ApiProperty({
    example: StockStubWithDeletedAt,
  })
  public readonly data: typeof StockStubWithDeletedAt;
}
