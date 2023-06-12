import { useState } from 'react';

import { observer } from 'mobx-react';

import WithAppList from '@/components/templates/WithAppList';

import { useStore } from '@/utils';

import LockAndUnlockDataTable from './DataTable';

const LockAndUnlock = observer(() => {
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
      <LockAndUnlockDataTable appId={selectedValue} />
    </WithAppList>
  );
});

export default LockAndUnlock;
