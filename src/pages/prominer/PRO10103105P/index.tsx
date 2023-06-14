import { useState } from 'react';

import WithAppList from '@/components/templates/WithAppList';

import { useStore } from '@/utils';

import ProminerFieldDataTable from './DataTable';

function Resource() {
  const { ApplicationStore } = useStore();
  const [selectedValue, setSelectedValue] = useState<string>(ApplicationStore.selectedApplication.resource_id || '');

  const onValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <WithAppList
      value={selectedValue}
      onValueChange={onValueChange}
    >
      <ProminerFieldDataTable appId={selectedValue} />
    </WithAppList>
  );
}

export default Resource;
