import { PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class UpdateUserDTO extends PickType(UserDTO, [
  'email',
  'password',
  'name',
] as const) {}
