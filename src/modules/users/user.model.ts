import { CommonFields } from '@/shared/models/common.model';

export class User extends CommonFields {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;
}
