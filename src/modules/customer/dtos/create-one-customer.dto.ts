import { PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CustomerDTO } from './customer.dto';

export class CreateCustomerDTO extends PickType(CustomerDTO, [
  'email',
  'password',
  'name',
] as const) {
  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;

  @IsNotEmpty()
  public readonly name: string;
}
