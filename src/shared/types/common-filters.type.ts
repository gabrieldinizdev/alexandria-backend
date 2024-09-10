import { PaginationOptionsDTO } from '../dto/pagination';
import { SelectModelFieldsType } from './select-model-fields.type';

export type CommonFilter<Entity> = {
  pagination: PaginationOptionsDTO;
  fields?: SelectModelFieldsType<Entity>;
};
