import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CustomerDTO } from './customer.dto';

class DefaultCreatedCustomerDTO extends PickType(CustomerDTO, [
  'name',
  'email',
  'password',
] as const) {}

class NewCreateCustomerDTO extends PickType(CustomerDTO, [
  'name',
  'email',
  'password',
] as const) {
  @IsNotEmpty()
  public readonly name: string;

  @IsNotEmpty()
  public readonly email: string;

  @IsNotEmpty()
  public readonly password: string;
}

export class CreateOneCustomerDTO extends IntersectionType(
  DefaultCreatedCustomerDTO,
  NewCreateCustomerDTO,
) {}
