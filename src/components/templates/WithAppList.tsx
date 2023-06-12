import { ChangeEvent, ReactNode, useEffect, useState } from 'react';

import { observer } from 'mobx-react';

import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { useStore } from '@/utils';

import Loader from '../molecules/Loader';
import { DropdownOptionType } from '../organisms/CmCommonTable/types';
import { CmDataSelectStyled, ContentWrapper, TypographyStyled, Wrapper } from './WithApiList.styled';

const WithAppList = observer(
  ({
    children,
    value,
    onValueChange,
  }: {
    children: ReactNode;
    value: string;
    onValueChange: (value: string) => void;
  }) => {
    const { ApplicationStore } = useStore();
    const [appList, setAppList] = useState<DropdownOptionType[]>([]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      onValueChange(e.target.value);
      ApplicationStore.setSelectedApplication(e.target.value);
    };

    useEffect(() => {
      if (ApplicationStore.application.length) {
        const newData: DropdownOptionType[] = [];
        ApplicationStore.application.map((item: ApplicationDto) => {
          newData.push({
            label: item.physical_name,
            value: item.resource_id,
          });
        });
        onValueChange(newData[0].value);
        ApplicationStore.setSelectedApplication(newData[0].value);
        setAppList(newData);
      } else {
        ApplicationStore.loadApplicationList();
      }
    }, [ApplicationStore.application]);

    return (
      <Wrapper>
        {ApplicationStore.isLoading ? (
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
  }
);

export default WithAppList;
