import { useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import { deleteRequest, postRequest, putRequest } from '@/apis/apiClient';
import { IPlainObject } from '@/types/common';

import { RequestType } from '../const/api';

type ApiMethodBy = {
  endpoint?: string;
  method?: RequestType;
  apiRequestFn?: (requestParams: IPlainObject) => Promise<AxiosResponse>;
};

type ApiMethodRequired =
  | (Partial<Pick<ApiMethodBy, 'endpoint' | 'method'>> & Required<Pick<ApiMethodBy, 'apiRequestFn'>>)
  | (Partial<Pick<ApiMethodBy, 'apiRequestFn'>> & Required<Pick<ApiMethodBy, 'endpoint' | 'method'>>);

type UseApiMutationProps<ApiResponse> = ApiMethodRequired & {
  onError?: (error: AxiosError) => void;
  onCompleted?: (response: ApiResponse) => void;
};

const useApiMutation = <ApiResponse extends IPlainObject>({
  onError,
  onCompleted,
  apiRequestFn,
  endpoint,
  method,
}: UseApiMutationProps<ApiResponse>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestByMethodType = async (requestParams: IPlainObject) => {
    if (!endpoint) {
      return;
    }
    switch (method) {
      case RequestType.POST:
        return await postRequest(endpoint, requestParams);
      case RequestType.PUT:
        return await putRequest(endpoint, requestParams);
      case RequestType.DELETE:
        return await deleteRequest(endpoint, requestParams);
      default:
        return;
    }
  };

  const request = async (requestParams: IPlainObject) => {
    setIsLoading(true);
    try {
      let data;
      if (apiRequestFn) {
        const { data: dataResponse } = await apiRequestFn(requestParams);
        data = dataResponse;
      } else {
        data = await requestByMethodType(requestParams);
      }
      setIsLoading(false);
      onCompleted?.(data);
    } catch (error) {
      setIsLoading(false);
      onError?.(error?.response || error);
    }
  };
  return {
    isLoading,
    request,
  };
};

export default useApiMutation;
