import { ApiProperty } from '@nestjs/swagger';

import { CategoryStub } from '@/stubs';

export class CreatedOneCategoryResponseDTO {
  @ApiProperty({
    example: CategoryStub,
  })
  public readonly data: typeof CategoryStub;
}
