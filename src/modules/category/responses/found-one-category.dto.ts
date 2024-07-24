import { ApiProperty } from '@nestjs/swagger';

import { CategoryStub } from '@/stubs';

export class FoundOneCategoryByIdResponseDTO {
  @ApiProperty({
    example: CategoryStub,
  })
  public readonly data: typeof CategoryStub;
}
