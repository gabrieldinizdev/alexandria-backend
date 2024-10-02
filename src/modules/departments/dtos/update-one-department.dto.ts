import { OmitType, PartialType } from '@nestjs/swagger';

import { DepartmentDTO } from './department.dto';

export class UpdateOneDepartmentByIdDTO extends PartialType(
  OmitType(DepartmentDTO, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
