import { PickType } from '@nestjs/swagger';

import { ItemDTO } from './item.dto';

export class FindOneItemByIdDTO extends PickType(ItemDTO, ['id'] as const) {}
