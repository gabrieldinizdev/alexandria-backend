import { OmitType, PartialType } from '@nestjs/swagger';

import { CustomerDTO } from './customer.dto';

export class UpdateOneCustomerByIdDTO extends PartialType(
  OmitType(CustomerDTO, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
