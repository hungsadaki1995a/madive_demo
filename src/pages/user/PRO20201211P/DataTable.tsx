import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';

import { useStore } from '@/utils';

type propsType = {
  rows?: any;
  columnsConfig?: any;
  fieldAsRowId: string;
  paginationConfig?: any;
  onSelectedRows?: (selectedRows: any) => void;
};
function UserGroupAssignDataTable(props: propsType) {
  const { rows, columnsConfig, fieldAsRowId, paginationConfig, onSelectedRows } = props;
  const { AlertStore } = useStore();

  return (
    <CommonTable
      fieldAsRowId={fieldAsRowId}
      columnsConfig={columnsConfig}
      rows={rows}
      hasSelectionRows
      onSelectedRows={onSelectedRows}
      sortDefault={{
        field: fieldAsRowId,
        direction: 'asc',
      }}
      paginationConfig={paginationConfig}
    />
  );
}
export default observer(UserGroupAssignDataTable);
