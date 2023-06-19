import { IPlainObject } from '@/types/common';

export enum ESearchType {
  FORWARD = 'Forward',
  BACKWARD = 'Backward',
}

export interface IColumnConfig {
  label: string;
  field: string;
  width?: string;
}

export type CmTreeDepthProps<TValue, TValue2> = {
  isShowTopButton?: boolean;
  onTopButtonClicked?: (value: ESearchType) => void;
  isLoading: boolean;
  rootColumns: IColumnConfig[];
  rootRow: TValue;
  dataColumns: IColumnConfig[];
  data: TValue2[];
  formatDataFn: (data: TValue2[]) => TreeData[][];
};

export interface TreeData {
  id: string;
  value: IPlainObject;
  depth: number;
  parentId: string;
  hasChildren: boolean;
  isShow: boolean;
  isExpand: boolean;
}
