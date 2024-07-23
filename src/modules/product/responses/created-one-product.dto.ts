import { ApiProperty } from '@nestjs/swagger';

import { ProductStub } from '@/stubs/product';

export class CreatedOneProductResponseDTO {
  @ApiProperty({
    example: ProductStub,
  })
  public readonly data: typeof ProductStub;
}
