import { Injectable, PipeTransform } from '@nestjs/common';

import { SelectModelFieldsType } from '@/shared/types';

@Injectable()
export class SelectFieldsPipe<Model> implements PipeTransform {
  public transform(value: Array<keyof Model>) {
    const initialObject: SelectModelFieldsType<Model> = {};
    const fields = value.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, initialObject);

    return fields;
  }
}
