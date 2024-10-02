import { OmitType, PartialType } from '@nestjs/swagger';

import { CategoryDTO } from './category.dto';

export class UpdateOneCategoryByIdDTO extends PartialType(
  OmitType(CategoryDTO, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
