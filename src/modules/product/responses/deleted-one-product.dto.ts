import { ApiProperty } from '@nestjs/swagger';

import { ProductStubWithDeletetAt } from '@/stubs/product';

export class DeletedOneProductResponseDTO {
  @ApiProperty({
    example: ProductStubWithDeletetAt,
  })
  public readonly data: typeof ProductStubWithDeletetAt;
}
