import { useState } from 'react';

import { AxiosError } from 'axios';

import { IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { getRequest } from '@/apis/apiClient';

type UseApiLazyQueryProps<ApiResponse> = {
  endpoint: string;
  onError?: (error: AxiosError) => void;
  onCompleted?: (response: ApiResponse) => void;
};

const useApiLazyQuery = <ApiResponse extends IPlainObject>({
  endpoint,
  onError,
  onCompleted,
}: UseApiLazyQueryProps<ApiResponse>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = async (requestParams: IPlainObject) => {
    setIsLoading(true);
    try {
      const { data } = await getRequest(endpoint, requestParams);
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

export default useApiLazyQuery;
