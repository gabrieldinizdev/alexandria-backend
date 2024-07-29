import { OmitType, PartialType, IntersectionType } from '@nestjs/swagger';

import { UserDTO } from './user.dto';

class DefaultUpdateUserDTO extends OmitType(UserDTO, ['id'] as const) {}

class NewUpdateUserDTO extends PartialType(DefaultUpdateUserDTO) {}

export class UpdateUserDTO extends IntersectionType(
  DefaultUpdateUserDTO,
  NewUpdateUserDTO,
) {}
