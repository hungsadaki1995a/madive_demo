import { useState } from 'react';

import WithAppList from '@/components/templates/WithAppList';

import LockAndUnlockDataTable from './DataTable';

const LockAndUnlock = () => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const onValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <WithAppList
      value={selectedValue}
      onValueChange={onValueChange}
    >
      <LockAndUnlockDataTable />
    </WithAppList>
  );
};

export default LockAndUnlock;
