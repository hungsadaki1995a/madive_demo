import { PageInfoDto } from '../typeBundle';
import { PagingResultDto } from './pagingResultDto';

export type ModelDbioDto = {
  alias: string;
  count: number;
  id: string;
  ip: string;
  pageInfoDto: PageInfoDto;
  conditionDto: {
    key: string;
    value: string;
  }[];
  pagingResultDto: PagingResultDto;
  port: string;
  pw: string;
  vender: string;
};

type responseHeader = {
  fileBaseDirectory: null;
  files: [];
  guid: null;
  inputMsgType: null;
  length: number;
  outputMsgType: null;
  responseCode: string;
  responseMsg: null;
  responseMsgDetails: null;
  service: null;
  tenantId: null;
  transferKey: null;
};

export type ModelDbioResponseDto = {
  dto: {
    ModelDbioDto: ModelDbioDto[];
  };
  header: any;
};
