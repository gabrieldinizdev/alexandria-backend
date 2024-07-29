import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { UserDTO } from './user.dto';

class DefaultCreateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
  'name',
] as const) {}

class NewCreateUserDTO extends PickType(UserDTO, [
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

export class CreateUserDTO extends IntersectionType(
  DefaultCreateUserDTO,
  NewCreateUserDTO,
) {}
