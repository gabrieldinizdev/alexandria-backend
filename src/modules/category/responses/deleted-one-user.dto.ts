import { ApiProperty } from '@nestjs/swagger';

import { CategoryStubWithDeletetAt } from '@/stubs';

export class DeletedOneCategoryResponseDTO {
  @ApiProperty({
    example: CategoryStubWithDeletetAt,
  })
  public readonly data: typeof CategoryStubWithDeletetAt;
}
