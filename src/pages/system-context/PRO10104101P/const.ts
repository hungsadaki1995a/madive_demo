import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import { IButtonMenuConfig, ICommonTableColumn, ISortInfo } from '@/components/organisms/CmCommonTable/types';

import { SystemContextDtos } from '@/types/dtos/systemContextDtos';

import { ISystemContextDetail } from '@/pages/system-context/PRO10104101P/type';

export const defaultFilterField = 'key';

export const sortDefaultValues: ISortInfo = {
  direction: SortDirectionTypes.DESC,
  field: defaultFilterField,
};

export enum SystemContextActionEnum {
  EDIT = 'edit',
  DELETE = 'delete',
}

export const systemContextDetailDefault: ISystemContextDetail = {
  key: '',
  value: '',
};

export const systemContextColumnsDefault: ICommonTableColumn<SystemContextDtos>[] = [
  {
    field: 'key',
    label: 'Key',
    type: 'text',
    sortable: true,
  },
  {
    field: 'value',
    label: 'Value',
    type: 'text',
    sortable: true,
  },
];

export const systemContextActionsConfig: IButtonMenuConfig = {
  placeholder: 'Action',
  options: [
    {
      label: 'Edit',
      value: SystemContextActionEnum.EDIT,
    },
    {
      label: 'Delete',
      value: SystemContextActionEnum.DELETE,
    },
  ],
};
