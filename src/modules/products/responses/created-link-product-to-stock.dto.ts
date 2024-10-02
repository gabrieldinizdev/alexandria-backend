import { ApiProperty } from '@nestjs/swagger';

import { ProductOnStockStub } from '@/stubs';

export class CreatedProductOnStockResponseDTO {
  @ApiProperty({
    example: ProductOnStockStub,
  })
  public readonly data: typeof ProductOnStockStub;
}
