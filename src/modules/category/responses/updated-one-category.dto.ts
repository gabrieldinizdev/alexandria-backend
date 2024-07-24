import { ApiProperty } from '@nestjs/swagger';

import { CategoryStub } from '@/stubs';

export class UpdatedOneCategoryResponseDTO {
  @ApiProperty({
    example: CategoryStub,
  })
  public readonly data: typeof CategoryStub;
}
