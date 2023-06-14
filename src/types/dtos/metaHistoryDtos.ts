import { PageInfoDto, PagingResultDto } from '../typeBundle';

export type MetaHistoryDto = {
  history_id: string;
  history_type: string;
  physical_name: string;
  logical_name: string;
  field_type: string;
  length: string;
  update_time: string;
  modifier: string;
  resource_id: string;
};

export type MetaHistoryListResponseDto = {
  dto: {
    MetaHistoryDto: MetaHistoryDto[];
    pageInfoDto: PageInfoDto;
    pagingResultDto: PagingResultDto;
  };
};

export type MetaHistoryFilterDto = {
  resource_id: string;
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
