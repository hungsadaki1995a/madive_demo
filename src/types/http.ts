export interface IHttpError {
  code: string;
  message: string;
  name: string;
  stackTrace: string;
}

interface IHeader {
  fileBaseDirectory: string | null;
  files: string[];
  guid: string | null;
  inputMsgType: string | null;
  length: number;
  outputMsgType: string | null;
  responseCode: string;
  responseMsg: string | null;
  responseMsgDetails: string | null;
  service: string | null;
  tenantId: string | null;
  transferKey: string | null;
}

export interface IOriginalResponse {
  header: IHeader;
  dto?: string[];
  exception?: IHttpError;
}
