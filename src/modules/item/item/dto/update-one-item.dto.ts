import { OmitType, PartialType } from '@nestjs/swagger';

import { ItemDTO } from './item.dto';

export class UpdateOneItemByIdDTO extends PartialType(
  OmitType(ItemDTO, [
    'id',
    'price',
    'productId',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]),
) {}
