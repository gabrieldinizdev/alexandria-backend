import { ApiProperty } from '@nestjs/swagger';

import { UserStub } from '@/stubs';

export class FoundOneUserResponseDTO {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
