import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CommonFieldsDTO {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '669543757fcd695893969290',
  })
  public readonly id: string;

  @IsString()
  @ApiProperty({
    description: 'Date when the user was deleted',
    example: '2024-07-15T15:27:15.700Z',
    required: false,
  })
  public readonly deletedAt?: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date when the user was updated',
    example: '2024-07-15T15:27:15.700Z',
  })
  public readonly updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date when the user was created',
    example: '2024-07-15T15:27:15.700Z',
  })
  public readonly createdAt: Date;
}
