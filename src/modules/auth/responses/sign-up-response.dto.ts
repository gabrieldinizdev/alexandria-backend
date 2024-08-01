import { ApiProperty } from '@nestjs/swagger';

import { CustomerStub } from '@/stubs';

export class SignUpCustomerResponseDTO {
  @ApiProperty({
    example: CustomerStub,
  })
  public readonly data: typeof CustomerStub;
}
