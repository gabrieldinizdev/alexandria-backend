import { ApiProperty } from '@nestjs/swagger';

import { ProductOnStockStub } from '@/stubs/product-on-stock';

export class CreatedProductOnStockResponseDTO {
  @ApiProperty({
    example: ProductOnStockStub,
  })
  public readonly data: typeof ProductOnStockStub;
}
