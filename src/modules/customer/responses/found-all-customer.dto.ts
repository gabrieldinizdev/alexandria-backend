import { ApiProperty } from '@nestjs/swagger';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';

import { CustomerDTO } from '../dtos';

export class FoundAllCustomerResponseDTO {
  @ApiProperty({ type: CustomerDTO, isArray: true })
  public readonly data: CustomerDTO[];

  @ApiProperty()
  public readonly meta: PaginationMetaDTO;
}
