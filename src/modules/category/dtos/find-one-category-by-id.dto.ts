import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CategoryDTO } from './category.dto';

class DefaultFindCategoryDTO extends PickType(CategoryDTO, ['id'] as const) {}

class NewFindCategoryDTO extends PickType(CategoryDTO, ['id'] as const) {
  @IsNotEmpty()
  public readonly id: string;
}

export class FindOneCategoryByIdDTO extends IntersectionType(
  DefaultFindCategoryDTO,
  NewFindCategoryDTO,
) {}
