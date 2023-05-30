export interface IOption<T extends string | number | boolean> {
  label: string;
  value: T;
}
