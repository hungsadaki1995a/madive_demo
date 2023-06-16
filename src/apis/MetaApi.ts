import { AxiosError } from 'axios';

import { TableDataResponseDto, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { MetaDtos } from '@/types/dtos/MetaDtos';
import { IOriginalResponse } from '@/types/http';
import MetaModel from '@/types/models/metaModel';

import { MetaEndPoint } from '@/constants/apiEndpoint';

import apiClient from './apiClient';

type MetaGetApiParam = {
  page?: number;
  pageLength?: number;
  sort?: boolean;
  sortingType?: string;
  sortField?: string;
};

const MetaApi = {
  MetaListGet: async (tableState: TableViewState): Promise<TableDataResponseDto<MetaDtos> | any> => {
    const { sort, sortField, sortingType } = tableState;
    try {
      const conditionDto = Object.entries(tableState.filter.server).map(([key, value]) => ({ key, value }));
      const data: IOriginalResponse = await apiClient.get(MetaEndPoint.metaList, {
        params: {
          [JSON.stringify({
            dto: {
              pageInfoDto: {
                pageNum: 1,
                pageLength: -1,
              },
              sort,
              sortField,
              sortingType,
              conditionDto: conditionDto,
            },
          })]: '',
          _: new Date().getTime(),
        },
      });
      return { data: data?.dto?.MetaDto, totalSum: data?.dto?.pagingResultDto?.totalNum };
    } catch (error) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  TableListGet: async (db_type: string): Promise<any> => {
    try {
      const data: IOriginalResponse = await apiClient.get(MetaEndPoint.getTableList, {
        params: {
          [JSON.stringify({
            dto: {
              db_type,
            },
          })]: '',
          _: new Date().getTime(),
        },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  ColumnListGet: async (db_type: string, table_name: string): Promise<any> => {
    try {
      const data: IOriginalResponse = await apiClient.get(MetaEndPoint.getColumnList, {
        params: {
          [JSON.stringify({
            dto: {
              db_type,
              table_name,
            },
          })]: '',
          _: new Date().getTime(),
        },
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  MetaCreate: async (submitValue: MetaModel): Promise<{ value: string } | any> => {
    try {
      const data: IOriginalResponse = await apiClient.post(MetaEndPoint.meta, {
        dto: submitValue,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  editMeta: async (submitValue: MetaModel): Promise<{ value: string } | any> => {
    try {
      const data: IOriginalResponse = await apiClient.put(MetaEndPoint.meta, {
        dto: submitValue,
      });
      return data;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  MetaListDelete: async (submitValue: MetaDtos[]): Promise<{ value: string } | any> => {
    try {
      const data: IOriginalResponse = await apiClient.delete(MetaEndPoint.metaList, {
        data: {
          dto: {
            MetaDto: submitValue,
          },
        },
      });
      return data?.dto;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error.response : error;
    }
  },

  MetaExcelUpload: async ({
    creator,
    filename,
    contents,
  }: {
    creator: string;
    filename?: string;
    contents?: string;
  }): Promise<{ value: string } | any> => {
    try {
      const res: IOriginalResponse = await apiClient.put(
        MetaEndPoint.importExcel,
        {
          files: [{ filename, contents }],
          dto: { creator },
        },
        {
          headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json;charset=UTF-8',
            Proobjectwebfiletransfer: true,
          },
        }
      );

      return res;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error?.response : error;
    }
  },

  MetaSampleFileGet: async (): Promise<{ value: string } | any> => {
    const downloadFile = (contents: string, filename: string, extension: string) => {
      const link = document.createElement('a');
      link.href = contents;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    try {
      const data: any = await apiClient.get(MetaEndPoint.getExcelSample, {
        params: {
          _: new Date().getTime(),
        },
        headers: {
          Accept: 'application/json, text/javascript, */*; q=0.01',
          'Content-Type': 'application/json;charset=UTF-8',
          Proobjectwebfiletransfer: true,
        },
      });

      const { filename, contents } = data.files[0];
      const extension = filename.substring(filename.lastIndexOf('.') + 1, filename.length).toLowerCase();
      const downloadLink = `data:application/xls;base64,${contents}`;
      downloadFile(downloadLink, filename, `application/${extension}`);

      return data?.files;
    } catch (error: unknown) {
      return error instanceof AxiosError ? error?.response : error;
    }
  },
};

export default MetaApi;
