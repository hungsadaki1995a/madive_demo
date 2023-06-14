import { FormElementType } from '@/constants/form';

export interface ITestHistoryDetailField {
  fieldName: string;
  label: string;
  type: FormElementType;
}

export interface ITestHistoryDetail {
  input_dto_name: string;
  create_time: string;
  testcase_name: string;
  node_ip: string;
  node_http_port: string;
  header_data: string;
  input_data: string;
  output_data: string;
  node_name: string;
  service_group_name: string;
  physical_name: string;
  testcase_id?: string;
  resource_id: string;
  node_id: string;
}
