import { PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class FindOneUserDTO extends PickType(UserDTO, ['id'] as const) {}
