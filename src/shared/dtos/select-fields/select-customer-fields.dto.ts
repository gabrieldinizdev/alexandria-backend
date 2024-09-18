import { ApiProperty } from '@nestjs/swagger';

export class SelectFieldsDTO<Model> {
  @ApiProperty({
    required: false,
    type: String,
    isArray: true,
  })
  public readonly select?: (keyof Model)[];
}
