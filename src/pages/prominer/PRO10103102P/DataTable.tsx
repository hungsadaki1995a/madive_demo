import { useEffect, useMemo, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn } from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { useStore } from '@/utils';

import useTableTree from './useTableTree';

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
  useTableTree();

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
        // renderPaginationAs={TablePaginationCustom}
        //bottomActionsConfig={bottomActionsConfig}
      />
    </Paper>
  );
}
export default observer(ViewResourceDetailDataTable);
