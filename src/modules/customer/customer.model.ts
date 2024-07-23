import { CommonFields } from '@/shared/models/common.model';

export class Customer extends CommonFields {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;
}
