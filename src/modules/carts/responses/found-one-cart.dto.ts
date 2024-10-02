import { ApiProperty } from '@nestjs/swagger';

import { CartStub } from '@/stubs';

export class FoundOneCartResponseDTO {
  @ApiProperty({
    example: CartStub,
  })
  public readonly data: typeof CartStub;
}
