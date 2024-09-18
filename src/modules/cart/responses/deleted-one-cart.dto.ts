import { ApiProperty } from '@nestjs/swagger';

import { CartStubWithDeletedAt } from '@/stubs/cart';

export class DeletedOneCartResponseDTO {
  @ApiProperty({
    example: CartStubWithDeletedAt,
  })
  public readonly data: typeof CartStubWithDeletedAt;
}
