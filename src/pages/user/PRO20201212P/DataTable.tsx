import { Paper } from '@mui/material';
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
function GroupRoleAssignDataTable(props: propsType) {
  const { rows, columnsConfig, fieldAsRowId, paginationConfig, onSelectedRows } = props;
  const { AlertStore } = useStore();

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="prominer-resource-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId={fieldAsRowId}
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        //topActionConfig={topActionConfig}
        //filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: fieldAsRowId,
          direction: 'asc',
        }}
        onSortChange={() => console.log('')}
        // renderPaginationAs={TablePaginationCustom}
        //bottomActionsConfig={bottomActionsConfig}
        paginationConfig={paginationConfig}
      />
    </Paper>
  );
}
export default observer(GroupRoleAssignDataTable);
