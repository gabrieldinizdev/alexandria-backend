import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination';

import { CartDTO } from '../dto';

export class FoundAllCartResponseDTO {
  @ApiProperty({
    type: CartDTO,
    isArray: true,
  })
  public readonly data: CartDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
