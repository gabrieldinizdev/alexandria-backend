import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { CartDTO } from '../dtos';

export class FoundAllCartResponseDTO {
  @ApiProperty({
    type: CartDTO,
    isArray: true,
  })
  public readonly data: CartDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
