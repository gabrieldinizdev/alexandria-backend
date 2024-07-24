import { PickType } from '@nestjs/swagger';

import { DepartmentDTO } from './department.dto';

export class FindOneDepartmentByIdDTO extends PickType(DepartmentDTO, [
  'id',
] as const) {}
