import { useState } from 'react';

import WithAppList from '@/components/templates/WithAppList';

import TestHistoryDataTable from '../PRO10102119P/DataTable';

function History() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const onValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <WithAppList
      value={selectedValue}
      onValueChange={onValueChange}
    >
      <TestHistoryDataTable selectedValue={selectedValue} />
    </WithAppList>
  );
}
export default History;
