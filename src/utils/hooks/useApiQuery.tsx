import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { getRequest } from '@/apis/apiClient';
import { IPlainObject } from '@/types/common';
import { IOriginalResponse } from '@/types/http';

type UseApiQueryProps<DataType extends IPlainObject | IPlainObject[]> = {
  endpoint: string;
  onError?: (error: AxiosError) => void;
  onCompleted?: (response: IOriginalResponse) => void;
  map?: (data: IOriginalResponse) => DataType;
  immediate?: boolean;
  skip?: boolean;
  deps?: any;
  variables?: IPlainObject;
};

type UseApiQueryResult<DataType extends IPlainObject | IPlainObject[]> = {
  isLoading: boolean;
  request: (requestParams?: IPlainObject) => Promise<void>;
  data: DataType | undefined;
  error: AxiosError | undefined;
};

const useApiQuery = <DataType extends IPlainObject | IPlainObject[]>({
  endpoint,
  onError,
  onCompleted,
  map,
  immediate = false,
  skip = false,
  deps = '',
  variables,
}: UseApiQueryProps<DataType>): UseApiQueryResult<DataType> => {
  const [data, setData] = useState<DataType>();
  const [error, setError] = useState<AxiosError>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = useCallback(
    async (requestParams?: IPlainObject) => {
      if (skip) {
        return;
      }
      setIsLoading(true);
      try {
        const response = await getRequest(endpoint, requestParams);
        const dataConverted = map ? map(response) : response;
        setData(dataConverted as DataType);
        setError(undefined);
        onCompleted?.(response);
      } catch (error) {
        setData(undefined);
        setError(error?.response || error);
        onError?.(error?.response || error);
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (immediate) {
      request(variables);
    }
  }, [immediate, ...deps]);

  return {
    isLoading,
    request,
    data,
    error,
  };
};

export default useApiQuery;
