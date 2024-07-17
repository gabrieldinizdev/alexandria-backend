import { PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class FindOneUserByEmailDTO extends PickType(UserDTO, [
  'email',
] as const) {}
