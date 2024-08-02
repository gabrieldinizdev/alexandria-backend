import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordResponseDTO {
  @ApiProperty({
    example: true,
  })
  public readonly data: boolean;
}
