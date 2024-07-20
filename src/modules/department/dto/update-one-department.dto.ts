import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { DepartmentDTO } from './department.dto';

class DefaultUpdateDepartmentDTO extends PickType(DepartmentDTO, [
  'name',
] as const) {}

class NewUpdateDepartmentDTO extends PickType(DepartmentDTO, [
  'name',
] as const) {
  @IsNotEmpty()
  public readonly name: string;
}

export class UpdateDepartmentDTO extends IntersectionType(
  DefaultUpdateDepartmentDTO,
  NewUpdateDepartmentDTO,
) {}
