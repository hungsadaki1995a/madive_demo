import { PageInfoDto, PagingResultDto } from '../typeBundle';

export type ApplicationDto = {
  resource_id: string;
  physical_name: string;
  logical_name: string;
  create_time: string;
  package_prefix: string;
  commit_type: string;
  creator: string;
  manager: string;
  description: string;
  sgCnt: number;
  soCnt: number;
  joCnt: number;
  boCnt: number;
  dofCnt: number;
  doCnt: number;
  rscCnt: number;
};

export type AppListSGDto = {
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
export type AplicationFilterDto = {
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

export type ApplicationListResponseDto = {
  dto: {
    ApplicationDto: ApplicationDto[];
    pageInfoDto: PageInfoDto;
    pagingResultDto: PagingResultDto;
  };
};
