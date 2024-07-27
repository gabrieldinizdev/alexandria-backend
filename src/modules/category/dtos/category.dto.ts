import { ApiProperty } from '@nestjs/swagger';

import { IsString, MaxLength } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class CategoryDTO extends CommonFieldsDTO {
  @IsString()
  @MaxLength(64)
  @ApiProperty({
    description: 'Category name',
    example: 'Indie',
  })
  public readonly name: string;

  @IsString()
  @ApiProperty({
    description: 'Department id',
    example: '669e967b746e482c2c045973',
  })
  public readonly departmentId: string;
}
