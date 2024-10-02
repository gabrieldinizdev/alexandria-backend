import { ApiProperty } from '@nestjs/swagger';

import { ProductStubWithDeletedAt } from '@/stubs';

export class DeletedOneProductResponseDTO {
  @ApiProperty({
    example: ProductStubWithDeletedAt,
  })
  public readonly data: typeof ProductStubWithDeletedAt;
}
