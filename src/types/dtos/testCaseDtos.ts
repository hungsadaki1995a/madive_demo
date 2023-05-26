import { PageInfoDto, PagingResultDto } from '../typeBundle';

export type TestCaseDto = {
  testcase_id: string;
  testcase_name: string;
  resource_id: string;
  node_id: string;
  physical_name: string;
  service_name: string;
  service_group_name: string;
  app_resource_id: string;
  application_name: string;
  creator: string;
  create_time: string;
  update_time: string;
  header_data: string;
  input_data: string;
  input_dto_name: string;
  node_name: string;
  output_data: string;
};

export type TestCaseListResponseDto = {
  dto: {
    TestCaseDto: TestCaseDto[];
    pageInfoDto: PageInfoDto;
    pagingResultDto: PagingResultDto;
  };
};

export type TestCaseDeleteResponseDto = {
  dto: {
    value: string;
  };
  header: any;
};

export type TestCaseFilterDto = {
  app_resource_id: string;
  pageInfoDto: {
    pageNum: number;
    pageLength: string;
    sort: boolean;
    sortingType: 'asc' | 'desc';
    sortField: string;
  };
  conditionDto: {
    key: string;
    value: string;
  }[];
};

export type TestCaseRequestDto = {
  resource_id: string;
  node_id: string;
};

export type TestCaseDetailResponseDto = {
  dto: {
    deploy_finish_time: string;
    node_http_port: string;
    node_id: string;
    node_ip: string;
    resource_id: string;
  };
};
