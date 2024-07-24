import { ApiProperty } from '@nestjs/swagger';

import { ProductStub } from '@/stubs/product';

export class UpdatedOneProductResponseDTO {
  @ApiProperty({
    example: ProductStub,
  })
  public readonly data: typeof ProductStub;
}
