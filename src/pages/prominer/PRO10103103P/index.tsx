import { useState } from 'react';

import { observer } from 'mobx-react';

import WithAppList from '@/components/templates/WithAppList';

import { ProminerMethodDto } from '@/types/dtos/prominerDtos';
import { useStore } from '@/utils';

import ViewMethodDetail from '../PRO10103104P';
import ProminerMethodDataTable from './DataTable';

export enum View {
  LIST = 'LIST',
  DETAIL = 'DETAIL',
}

const Method = observer(() => {
  const { ApplicationStore } = useStore();
  const [appId, setAppId] = useState<string>(ApplicationStore.selectedApplication.resource_id || '');
  const [currentView, setCurrentView] = useState<View>(View.LIST);
  const [currentData, setCurrentData] = useState<ProminerMethodDto>({} as ProminerMethodDto);

  const onAppIdChange = (value: string) => {
    setAppId(value);
  };

  const handleChangeView = (view: View) => {
    setCurrentView(view);
  };

  const handleChangeData = (data: ProminerMethodDto) => {
    setCurrentData(data);
  };

  if (currentView === View.DETAIL) {
    return (
      <ViewMethodDetail
        handleChangeView={handleChangeView}
        data={currentData}
      />
    );
  }

  return (
    <WithAppList
      value={appId}
      onValueChange={onAppIdChange}
    >
      <ProminerMethodDataTable
        appId={appId}
        handleChangeView={handleChangeView}
        handleChangeData={handleChangeData}
      />
    </WithAppList>
  );
});

export default Method;
