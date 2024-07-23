import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class CategoryDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Category name',
    example: 'Indie',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'Department id',
    example: '669e967b746e482c2c045973',
  })
  departmentId: string;
}
