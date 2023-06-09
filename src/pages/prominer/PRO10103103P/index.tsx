import { useState } from 'react';

import WithAppList from '@/components/templates/WithAppList';

import ProminerMethodDataTable from './DataTable';

function Method() {
  const [appId, setAppId] = useState<string>('');

  const onAppIdChange = (value: string) => {
    setAppId(value);
  };

  return (
    <WithAppList
      value={appId}
      onValueChange={onAppIdChange}
    >
      <ProminerMethodDataTable appId={appId} />
    </WithAppList>
  );
}
export default Method;
