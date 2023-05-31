import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import {
  IButtonMenuConfig,
  ICommonTableColumn,
  IPaginationParams,
  ISortInfo,
} from '@/components/organisms/CmCommonTable/types';

import { TestCaseDto } from '@/types/dtos/testCaseDtos';

import { FormElementType } from '@/constants/form';

import { ITestCaseDetail, ITestCaseDetailField } from './types';

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

export const testCaseColumnsDefault: ICommonTableColumn<TestCaseDto>[] = [
  {
    field: 'testcase_name',
    label: 'TestCase Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'physical_name',
    label: 'Resource Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'service_group_name',
    label: 'ServiceGroup Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'application_name',
    label: 'Application Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'creator',
    label: 'Creator',
    type: 'text',
    sortable: true,
  },
  {
    field: 'create_time',
    label: 'Create Time',
    type: 'text',
    sortable: true,
  },
  {
    field: 'update_time',
    label: 'Update Time',
    type: 'text',
    sortable: true,
  },
];

export enum TestCaseActionEnum {
  TEST = 'test',
  DETAIL = 'detail',
  EDIT = 'edit',
  DELETE = 'delete',
}

export const testCaseActionsConfig: IButtonMenuConfig = {
  placeholder: 'Action',
  options: [
    {
      label: 'Test',
      value: TestCaseActionEnum.TEST,
    },
    {
      label: 'Detail',
      value: TestCaseActionEnum.DETAIL,
    },
    {
      label: 'Edit',
      value: TestCaseActionEnum.EDIT,
    },
    {
      label: 'Delete',
      value: TestCaseActionEnum.DELETE,
    },
  ],
};

export const testCaseDetailModalFields: ITestCaseDetailField[] = [
  {
    fieldName: 'testcase_name',
    label: 'Test Case Name',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'service_group_name',
    label: 'SG Name',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'physical_name',
    label: 'Resource Name',
    type: FormElementType.INPUT,
  },

  {
    fieldName: 'input_dto_name',
    label: 'Input Do Name',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_name',
    label: 'Node Name',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'create_time',
    label: 'Create Time',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_ip',
    label: 'Node IP',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'node_http_port',
    label: 'Node Http Port',
    type: FormElementType.INPUT,
  },
  {
    fieldName: 'header_data',
    label: 'Header Data',
    type: FormElementType.TEXTAREA,
  },
  {
    fieldName: 'input_data',
    label: 'Input Data',
    type: FormElementType.TEXTAREA,
  },
  {
    fieldName: 'output_data',
    label: 'Output Data',
    type: FormElementType.TEXTAREA,
  },
];

export const testCaseDetailDefault: ITestCaseDetail = {
  input_dto_name: '',
  create_time: '',
  testcase_name: '',
  node_ip: '',
  node_http_port: '',
  header_data: '',
  input_data: '',
  output_data: '',
  node_name: '',
  service_group_name: '',
  physical_name: '',
};
