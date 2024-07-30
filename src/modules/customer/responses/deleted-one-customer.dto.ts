import { ApiProperty } from '@nestjs/swagger';

import { CustomerStubWithDeletetAt } from '@/stubs';

export class DeletedOneCustomerResponseDTO {
  @ApiProperty({
    example: CustomerStubWithDeletetAt,
  })
  public readonly data: typeof CustomerStubWithDeletetAt;
}
