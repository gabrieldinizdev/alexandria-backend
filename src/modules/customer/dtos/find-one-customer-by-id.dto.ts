import { PickType } from '@nestjs/swagger';

import { CustomerDTO } from './customer.dto';

export class FindOneCustomerByIdDTO extends PickType(CustomerDTO, [
  'id',
] as const) {}
