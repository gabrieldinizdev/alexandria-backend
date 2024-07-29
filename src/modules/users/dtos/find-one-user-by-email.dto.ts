import { IntersectionType, PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

class DefaultFindOneUserByEmailDTO extends PickType(UserDTO, [
  'email',
] as const) {}

class NewFindOneUserByEmailDTO extends PickType(UserDTO, ['email'] as const) {}

export class FindOneUserByEmailDTO extends IntersectionType(
  DefaultFindOneUserByEmailDTO,
  NewFindOneUserByEmailDTO,
) {}
