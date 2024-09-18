import { ApiProperty } from '@nestjs/swagger';

import { ItemStub } from '@/stubs/item';

export class UpdatedOneItemResponseDTO {
  @ApiProperty({
    example: ItemStub,
  })
  public readonly data: typeof ItemStub;
}
