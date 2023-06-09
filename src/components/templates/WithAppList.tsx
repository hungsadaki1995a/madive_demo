import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { ApplicationApi } from '@/apis';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { notify } from '@/utils/notify';

import Loader from '../molecules/Loader';
import { DropdownOptionType } from '../organisms/CmCommonTable/types';
import { CmDataSelectStyled, ContentWrapper, TypographyStyled, Wrapper } from './WithApiList.styled';

const WithAppList = ({
  children,
  value,
  onValueChange,
}: {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [appList, setAppList] = useState<DropdownOptionType[]>([]);

  const getApplicationList = async () => {
    try {
      const newData: DropdownOptionType[] = [];
      const data = await ApplicationApi.getList();

      if (data.length) {
        data.map((item: ApplicationDto) => {
          newData.push({
            label: item.physical_name,
            value: item.resource_id,
          });
        });
        onValueChange(newData[0].value);
        setAppList(newData);
      }
    } catch (error) {
      notify.error(error?.data?.exception?.name || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  useEffect(() => {
    getApplicationList();
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentWrapper>
          <TypographyStyled>Select Application</TypographyStyled>
          <CmDataSelectStyled
            optionsData={appList || []}
            onChange={onChange}
            value={value}
          />
          {children}
        </ContentWrapper>
      )}
    </Wrapper>
  );
};

export default WithAppList;
