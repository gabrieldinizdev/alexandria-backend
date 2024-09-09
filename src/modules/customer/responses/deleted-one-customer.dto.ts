import { ApiProperty } from '@nestjs/swagger';

import { CustomerStubWithDeletedAt } from '@/stubs';

export class DeletedOneCustomerResponseDTO {
  @ApiProperty({
    example: CustomerStubWithDeletedAt,
  })
  public readonly data: typeof CustomerStubWithDeletedAt;
}
