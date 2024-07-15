import { PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class CreateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
  'name',
] as const) {}
