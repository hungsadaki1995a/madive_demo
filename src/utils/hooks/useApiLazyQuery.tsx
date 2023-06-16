import { useState } from 'react';

import { AxiosError } from 'axios';

import { IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { getRequest } from '@/apis/apiClient';
import { IOriginalResponse } from '@/types/http';

type UseApiLazyQueryProps = {
  endpoint: string;
  onError?: (error: AxiosError) => void;
  onCompleted?: (response: IOriginalResponse) => void;
};

const useApiLazyQuery = ({ endpoint, onError, onCompleted }: UseApiLazyQueryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = async (requestParams: IPlainObject) => {
    setIsLoading(true);
    try {
      const response = await getRequest(endpoint, requestParams);
      setIsLoading(false);
      onCompleted?.(response);
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
