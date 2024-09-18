import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { ItemDTO } from '../dtos';

export class FoundAllItemResponseDTO {
  @ApiProperty({
    type: ItemDTO,
    isArray: true,
  })
  public readonly data: ItemDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
