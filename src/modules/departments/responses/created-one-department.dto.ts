import { ApiProperty } from '@nestjs/swagger';

import { DepartmentStub } from '@/stubs';

export class CreatedOneDepartmentResponseDTO {
  @ApiProperty({
    example: DepartmentStub,
  })
  public readonly data: typeof DepartmentStub;
}
