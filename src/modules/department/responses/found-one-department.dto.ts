import { ApiProperty } from '@nestjs/swagger';

import { DepartmentStub } from '@/stubs';

export class FoundOneDepartmentResponseDTO {
  @ApiProperty({
    example: DepartmentStub,
  })
  public readonly data: typeof DepartmentStub;
}
