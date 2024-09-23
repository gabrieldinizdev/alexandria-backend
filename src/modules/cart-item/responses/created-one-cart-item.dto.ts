import { ApiProperty } from '@nestjs/swagger';

import { CartItemStub } from '@/stubs';

export class CreatedOneCartItemResponseDTO {
  @ApiProperty({
    example: CartItemStub,
  })
  public readonly data: typeof CartItemStub;
}
