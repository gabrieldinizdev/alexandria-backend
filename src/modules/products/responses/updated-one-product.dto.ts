import { ApiProperty } from '@nestjs/swagger';

import { ProductStub } from '@/stubs';

export class UpdatedOneProductResponseDTO {
  @ApiProperty({
    example: ProductStub,
  })
  public readonly data: typeof ProductStub;
}
