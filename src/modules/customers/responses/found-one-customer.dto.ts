import { ApiProperty } from '@nestjs/swagger';

import { CustomerStub } from '@/stubs';

export class FoundOneCustomerResponseDTO {
  @ApiProperty({
    example: CustomerStub,
  })
  public readonly data: typeof CustomerStub;
}
