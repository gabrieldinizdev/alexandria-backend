import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { DepartmentDTO } from './department.dto';

class DefaultFindDepartmentDTO extends PickType(DepartmentDTO, [
  'id',
] as const) {}

class NewFindDepartmentDTO extends PickType(DepartmentDTO, ['id'] as const) {
  @IsNotEmpty()
  public readonly id: string;
}

export class FindDepartmentDTO extends IntersectionType(
  DefaultFindDepartmentDTO,
  NewFindDepartmentDTO,
) {}
