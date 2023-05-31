export interface IOption<T extends string | number | boolean> {
  label: string;
  value: T;
}

export interface IDialogBaseRef {
  show: (callback?: () => void) => void;
  hide: () => void;
}
