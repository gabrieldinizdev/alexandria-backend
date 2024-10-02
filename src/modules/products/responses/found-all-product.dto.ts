import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { ProductDTO } from '../dtos';

export class FoundAllProductResponseDTO {
  @ApiProperty({ type: ProductDTO, isArray: true })
  public readonly data: ProductDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
