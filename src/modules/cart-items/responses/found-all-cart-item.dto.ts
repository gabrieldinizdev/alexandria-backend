import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { CartItemDTO } from '../dtos';

export class FoundAllCartItemResponseDTO {
  @ApiProperty({
    type: CartItemDTO,
    isArray: true,
  })
  public readonly data: CartItemDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
