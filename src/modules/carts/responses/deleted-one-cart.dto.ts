import { ApiProperty } from '@nestjs/swagger';

import { CartStubWithDeletedAt } from '@/stubs';

export class DeletedOneCartResponseDTO {
  @ApiProperty({
    example: CartStubWithDeletedAt,
  })
  public readonly data: typeof CartStubWithDeletedAt;
}
