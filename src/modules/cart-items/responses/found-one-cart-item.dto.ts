import { ApiProperty } from '@nestjs/swagger';

import { CartItemStub } from '@/stubs';

export class FoundOneCartItemResponseDTO {
  @ApiProperty({
    example: CartItemStub,
  })
  public readonly data: typeof CartItemStub;
}
