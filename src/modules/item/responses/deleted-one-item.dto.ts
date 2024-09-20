import { ApiProperty } from '@nestjs/swagger';

import { ItemStubWithDeletedAt } from '@/stubs';

export class DeletedOneItemResponseDTO {
  @ApiProperty({
    example: ItemStubWithDeletedAt,
  })
  public readonly data: typeof ItemStubWithDeletedAt;
}
