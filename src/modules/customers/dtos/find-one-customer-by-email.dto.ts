import { PickType } from '@nestjs/swagger';

import { CustomerDTO } from './customer.dto';

export class FindOneCustomerByEmailDTO extends PickType(CustomerDTO, [
  'email',
] as const) {}
