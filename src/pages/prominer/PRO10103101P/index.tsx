import { useState } from 'react';

import WithAppList from '@/components/templates/WithAppList';

import PorminerResourceDataTable from './DataTable';

function Resource() {
  const [selectedValue, setSelectedValue] = useState<string>('');

  const onValueChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <WithAppList
      value={selectedValue}
      onValueChange={onValueChange}
    >
      <PorminerResourceDataTable appId={selectedValue} />
    </WithAppList>
  );
}

export default Resource;
