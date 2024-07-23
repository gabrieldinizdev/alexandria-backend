import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CategoryDTO } from './category.dto';

class DefaultUpdateCategoryDTO extends PickType(CategoryDTO, [
  'name',
] as const) {}

class NewUpdateCategoryDTO extends PickType(CategoryDTO, ['name'] as const) {
  @IsNotEmpty()
  public readonly name: string;
}

export class UpdateCategoryDTO extends IntersectionType(
  DefaultUpdateCategoryDTO,
  NewUpdateCategoryDTO,
) {}
