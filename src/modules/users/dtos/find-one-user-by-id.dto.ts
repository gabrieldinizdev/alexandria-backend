import { PickType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

export class FindOneUserByIdDTO extends PickType(UserDTO, ['id'] as const) {}
