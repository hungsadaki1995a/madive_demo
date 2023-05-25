import { PageInfoDto, PagingResultDto } from '../typeBundle';

export type TestCaseDto = {
  testcase_id: string;
  testcase_name: string;
  resource_id: string;
  physical_name: string;
  service_name: string;
  service_group_name: string;
  app_resource_id: string;
  application_name: string;
  creator: string;
  create_time: string;
  update_time: string;
};

export type TestCaseListResponseDto = {
  dto: {
    TestCaseDto: TestCaseDto[];
    pageInfoDto: PageInfoDto;
    pagingResultDto: PagingResultDto;
  };
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
