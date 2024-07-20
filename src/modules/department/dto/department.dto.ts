import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class DepartmentDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Department name',
    example: 'Games',
  })
  public readonly name: string;
}
