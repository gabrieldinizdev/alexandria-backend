import { OmitType, PartialType } from '@nestjs/swagger';

import { CustomerDTO } from './customer.dto';

export class UpdateCustomerDTO extends PartialType(
  OmitType(CustomerDTO, ['id', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
