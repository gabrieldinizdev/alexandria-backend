import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';

import { UserDTO } from '../dtos';

export class FoundAllUserResponseDTO {
  @ApiProperty({ type: UserDTO, isArray: true })
  public readonly data: UserDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
