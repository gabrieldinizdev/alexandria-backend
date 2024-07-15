import { ApiProperty } from '@nestjs/swagger';

import { UserStub } from '@/stubs';

export class DeletedUserResponse {
  @ApiProperty({
    example: UserStub,
  })
  public readonly data: typeof UserStub;
}
