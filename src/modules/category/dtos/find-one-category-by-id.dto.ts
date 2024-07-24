import { PickType } from '@nestjs/swagger';

import { CategoryDTO } from './category.dto';

export class FindOneCategoryByIdDTO extends PickType(CategoryDTO, [
  'id',
] as const) {}
