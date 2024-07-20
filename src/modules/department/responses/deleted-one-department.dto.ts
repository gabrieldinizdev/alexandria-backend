import { ApiProperty } from '@nestjs/swagger';

import { DepartmentStubWithDeletetAt } from '@/stubs';

export class DeletedOneDepartmentResponseDTO {
  @ApiProperty({
    example: DepartmentStubWithDeletetAt,
  })
  public readonly data: typeof DepartmentStubWithDeletetAt;
}
