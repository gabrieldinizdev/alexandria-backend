import { ApiProperty } from '@nestjs/swagger';

import { CartStub } from '@/stubs';

export class UpdatedOneCartResponseDTO {
  @ApiProperty({
    example: CartStub,
  })
  public readonly data: typeof CartStub;
}
