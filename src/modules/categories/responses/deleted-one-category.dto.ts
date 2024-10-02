import { ApiProperty } from '@nestjs/swagger';

import { CategoryStubWithDeletedAt } from '@/stubs';

export class DeletedOneCategoryResponseDTO {
  @ApiProperty({
    example: CategoryStubWithDeletedAt,
  })
  public readonly data: typeof CategoryStubWithDeletedAt;
}
