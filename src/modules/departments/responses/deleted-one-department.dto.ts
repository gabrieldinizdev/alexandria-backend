import { ApiProperty } from '@nestjs/swagger';

import { DepartmentStubWithDeletedAt } from '@/stubs';

export class DeletedOneDepartmentResponseDTO {
  @ApiProperty({
    example: DepartmentStubWithDeletedAt,
  })
  public readonly data: typeof DepartmentStubWithDeletedAt;
}
