import { ApiProperty } from '@nestjs/swagger';

import { CustomerDTO } from '../../../modules/customer/dtos/customer.dto';

export class SelectFieldsDTO {
  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
  })
  public readonly select?: (keyof CustomerDTO)[];
}
