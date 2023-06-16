import { useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { getRequest } from '@/apis/apiClient';

type UseApiQueryProps = {
  endpoint: string;
  onError?: (error: AxiosError) => void;
  variables: IPlainObject;
};

const useApiQuery = <ApiResponse extends IPlainObject>({ endpoint, onError, variables }: UseApiQueryProps) => {
  const [data, setData] = useState<ApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const request = async () => {
    setIsLoading(true);
    try {
      const { dto } = await getRequest(endpoint, variables);
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setIsLoading(false);
      onError?.(error?.response || error);
    }
  };
  useEffect(() => {
    request;
  }, []);

  return {
    isLoading,
    data,
  };
};

export default useApiQuery;
