import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CommonFieldsLinksTableDTO {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    description: 'id',
    example: '669543757fcd695893969290',
  })
  public readonly id: string;

  @IsString()
  @ApiProperty({
    description: 'Date when the link was cried',
    example: '2024-07-15T15:27:15.700Z',
    required: false,
  })
  public readonly assignedAt?: Date;
}
