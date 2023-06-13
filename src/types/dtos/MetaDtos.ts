import { PageInfoDto } from '../typeBundle';
import { PagingResultDto } from './pagingResultDto';

export interface MetaDto {
  resource_id: string;
  field_type: string;
  physical_name: string;
  logical_name: string;
  resource_group: string;
  length: string;
  array: string;
  comments: string;
  is_pk: string;
  is_key: string;
  is_index: string;
  allow_null: string;
  db_type: string;
  default_value: string;
  schema: string;
  meta_type: string;
  table_name: string;
  column_name: string;
  masking: string;
  masking_range: string;
  encrypt: string;
  decimal_size: string;
  seq: string;
  create_time: string;
  update_time: string;
  creator: string;
  modifier: string;
  is_use: string;
}

export interface MetaDtos extends MetaDto {
  conditionDto: [];
  count: number;
  history_id: string;
  history_type: string;
  pageInfoDto: PageInfoDto;
  pagingResultDto: PagingResultDto;
}

export type MetaListResponseDto = {
  dto: {
    TestCaseDto: MetaDto[];
    pageInfoDto: PageInfoDto;
    conditionDto: any[];
    pagingResultDto: PagingResultDto;
  };
  header: any;
};
