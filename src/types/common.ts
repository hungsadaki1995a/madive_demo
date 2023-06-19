export interface IOption<T extends string | number | boolean> {
  label: string;
  value: T;
}

export interface IDialogBaseRef {
  show: (callback?: () => void) => void;
  hide: () => void;
}

export type DropdownType = {
  value: string | number;
  label: string;
};

export type IPlainObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
