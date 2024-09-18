import { ApiProperty } from '@nestjs/swagger';

import { IsString, MaxLength } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dtos';

export class DepartmentDTO extends CommonFieldsDTO {
  @IsString()
  @MaxLength(64)
  @ApiProperty({
    description: 'Department name',
    example: 'Games',
  })
  public readonly name: string;
}
