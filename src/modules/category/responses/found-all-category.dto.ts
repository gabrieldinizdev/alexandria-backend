import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { CategoryDTO } from '../dtos';

export class FoundAllCategoryResponseDTO {
  @ApiProperty({ type: CategoryDTO, isArray: true })
  public readonly data: CategoryDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
