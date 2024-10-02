import { ApiProperty } from '@nestjs/swagger';

import { CartItemStubWithDeletedAt } from '@/stubs';

export class DeletedOneCartItemResponseDTO {
  @ApiProperty({
    example: CartItemStubWithDeletedAt,
  })
  public readonly data: typeof CartItemStubWithDeletedAt;
}
