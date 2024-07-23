import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CategoryDTO } from './category.dto';

class DefaultCreatedCategoryDTO extends PickType(CategoryDTO, [
  'name',
  'departmentId',
] as const) {}

class NewCreateCategoryDTO extends PickType(CategoryDTO, [
  'name',
  'departmentId',
] as const) {
  @IsNotEmpty()
  public readonly name: string;
  @IsNotEmpty()
  public readonly departmentId: string;
}

export class CreateCategoryDTO extends IntersectionType(
  DefaultCreatedCategoryDTO,
  NewCreateCategoryDTO,
) {}
