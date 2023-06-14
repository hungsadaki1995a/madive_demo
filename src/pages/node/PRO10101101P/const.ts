import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import {
  IButtonMenuConfig,
  ICommonTableColumn,
  IPaginationParams,
  ISortInfo,
} from '@/components/organisms/CmCommonTable/types';

import { NodeDto } from '@/types/dtos/nodeDtos';

import { FormElementType } from '@/constants/form';

import { INodeDetailField } from './type';

export const paginationDefaultValues: IPaginationParams = {
  rowsPerPageOptions: [10, 25, 50, 100],
  currentPage: 0,
  rowsPerPage: 10,
  totalCount: 0,
  rowsPerPagePosition: 'last',
};

export const defaultFilterField = 'update_time';

export const sortDefaultValues: ISortInfo = {
  direction: SortDirectionTypes.DESC,
  field: defaultFilterField,
};

export const nodeColumnsDefault: ICommonTableColumn<NodeDto>[] = [
  {
    field: 'node_name',
    label: 'Node Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_id',
    label: 'Node ID',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_ip',
    label: 'IP',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_file_port',
    label: 'File Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_http_port',
    label: 'Http Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_tcp_port',
    label: 'ProObject Port',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_is_ssl',
    label: 'SSL',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_admin',
    label: 'Admin',
    type: 'text',
    sortable: true,
  },
  {
    field: 'node_type',
    label: 'Node Type',
    type: 'text',
    sortable: true,
  },
  {
    field: 'description',
    label: 'Action',
    type: 'text',
    sortable: true,
  },
];

export enum NodeActionEnum {
  EDIT = 'edit',
  DELETE = 'delete',
}

export const nodeActionsConfig: IButtonMenuConfig = {
  placeholder: 'Action',
  options: [
    {
      label: 'Edit',
      value: NodeActionEnum.EDIT,
    },
    {
      label: 'Delete',
      value: NodeActionEnum.DELETE,
    },
  ],
};

export const nodeDetailModalFields: INodeDetailField[] = [
  {
    fieldName: 'node_name',
    label: 'Node Name',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_id',
    label: 'Node ID',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_ip',
    label: 'IP',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_file_port',
    label: 'File Port',
    type: FormElementType.INPUT,
  },

  {
    fieldName: 'node_http_port',
    label: 'Http Port',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_tcp_port',
    label: 'ProObject Port',
    type: FormElementType.INPUT,
  },
  // {
  //   fieldName: 'node_path',
  //   label: 'Create Time',
  //   type: FormElementType.INPUT,
  // },
  {
    fieldName: 'node_is_ssl',
    label: 'SSL',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_admin',
    label: 'Admin',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'description',
    label: 'Description',
    type: FormElementType.TEXTAREA,
  },
];

// export const testCaseDetailDefault: ITestCaseDetail = {
//   input_dto_name: '',
//   create_time: '',
//   testcase_name: '',
//   node_ip: '',
//   node_http_port: '',
//   header_data: '',
//   input_data: '',
//   output_data: '',
//   node_name: '',
//   service_group_name: '',
//   physical_name: '',
// };
