import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination';

import { DepartmentDTO } from '../dto';

export class FoundAllDepartmentResponseDTO {
  @ApiProperty({ type: DepartmentDTO, isArray: true })
  public readonly data: DepartmentDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
