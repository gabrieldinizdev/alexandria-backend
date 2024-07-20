import { ApiProperty } from '@nestjs/swagger';

import { DepartmentStub } from '@/stubs';

export class FoundAllDepartmentResponseDTO {
  @ApiProperty({ type: DepartmentStub })
  public readonly data: typeof DepartmentStub;
}
