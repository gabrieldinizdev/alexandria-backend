import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dtos';

import { DepartmentDTO } from '../dtos';

export class FoundAllDepartmentResponseDTO {
  @ApiProperty({ type: DepartmentDTO, isArray: true })
  public readonly data: DepartmentDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
