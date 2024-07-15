import { CommonFields } from '@/shared/models/commom.model';

export class User extends CommonFields {
  public username: string;

  public email: string;

  public password: string;
}
