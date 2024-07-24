import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { DepartmentDTO } from './department.dto';

class DefaultCreatedDepartmentDTO extends PickType(DepartmentDTO, [
  'name',
] as const) {}

class NewCreateUserDTO extends PickType(DepartmentDTO, ['name'] as const) {
  @IsNotEmpty()
  public readonly name: string;
}

export class CreateOneDepartmentDTO extends IntersectionType(
  DefaultCreatedDepartmentDTO,
  NewCreateUserDTO,
) {}
