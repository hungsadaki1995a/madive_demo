import { TestCaseApi } from '@/apis';

import { FormElementType } from '@/constants/form';

import { ITestHistoryDetail, ITestHistoryDetailField } from './styles';

export const testHistoryDetailModalFields: ITestHistoryDetailField[] = [
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
    fieldName: 'status',
    label: '​Test Result',
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

export const testHistoryDetailDefault: ITestHistoryDetail = {
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
  resource_id: '',
  node_id: '',
};
