import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination';

import { ItemDTO } from '../dto';

export class FoundAllItemResponseDTO {
  @ApiProperty({
    type: ItemDTO,
    isArray: true,
  })
  public readonly data: ItemDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
