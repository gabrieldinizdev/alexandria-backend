export type SelectModelFieldsType<Model> = {
  [K in keyof Partial<Model>]?: boolean;
};
