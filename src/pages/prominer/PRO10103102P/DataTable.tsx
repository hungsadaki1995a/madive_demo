import { useEffect, useMemo, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { useStore } from '@/utils';

const sampleRowsData = [
  {
    resource_name: 'SHBO',
    pakage_name: 'com.tmax.bo',
    resource_type: 'BIZ_OBJECT',
  },
  {
    resource_name: 'SHDOF',
    pakage_name: 'com.tmax.dof',
    resource_type: 'DATA_OBJECT_FACTORY',
  },
];

function ViewResourceDetailDataTable() {
  const { AlertStore } = useStore();
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'resource_name',
        label: 'Resource Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'pakage_name',
        label: 'Pakage Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'resource_type',
        label: 'Resource Type',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="prominer-resource-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        onSelectedRows={(selectedRows) => {
          //
        }}
        //topActionConfig={topActionConfig}
        //filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'logical_name',
          direction: 'asc',
        }}
        onSortChange={() => console.log('')}
        paginationConfig={{
          rowsPerPageOptions: [10, 25, 50, 100],
          currentPage: 0,
          rowsPerPage: 10,
          totalCount: 0,
          rowsPerPagePosition: 'last',
          onPageChange: (newPageIndex: number) => console.log(newPageIndex),
          onRowsPerPageChange: (newRowsPerPage: number) => console.log(newRowsPerPage),
        }}
        // renderPaginationAs={TablePaginationCustom}
        //bottomActionsConfig={bottomActionsConfig}
      />
    </Paper>
  );
}
export default observer(ViewResourceDetailDataTable);
