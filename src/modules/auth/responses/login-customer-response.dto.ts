import { ApiProperty } from '@nestjs/swagger';

import { LoginStub } from '@/stubs';

export class LoginResponseDTO {
  @ApiProperty({
    example: LoginStub,
  })
  public readonly data: typeof LoginStub;
}
