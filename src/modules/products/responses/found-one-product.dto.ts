import { ApiProperty } from '@nestjs/swagger';

import { ProductStub } from '@/stubs';

export class FoundOneProductResponseDTO {
  @ApiProperty({
    example: ProductStub,
  })
  public readonly data: typeof ProductStub;
}
