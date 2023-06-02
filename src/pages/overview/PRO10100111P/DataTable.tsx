import { useEffect, useMemo } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { IBottomAction, ICommonTableColumn, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import { useStore } from '@/utils';

function DoInfoDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'seq',
        label: 'Seq',
        type: 'text',
        sortable: true,
      },
      {
        field: 'do_name',
        label: 'Do Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'depth',
        label: 'Depth',
        type: 'text',
        sortable: true,
      },
      {
        field: 'field_type',
        label: 'Field Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'logical_name',
        label: 'Logical_Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'physical_name',
        label: 'Physical Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'length',
        label: 'Length',
        type: 'text',
        sortable: true,
      },
      {
        field: 'array',
        label: 'Array',
        type: 'text',
        sortable: true,
      },
      {
        field: 'comments',
        label: 'Comments',
        type: 'text',
        sortable: true,
      },
      {
        field: 'allow_null',
        label: 'Allow Null',
        type: 'text',
        sortable: true,
      },
      {
        field: 'default_value',
        label: 'Default Value',
        type: 'text',
        sortable: true,
      },
      {
        field: 'masking',
        label: 'Masking',
        type: 'text',
        sortable: true,
      },
      {
        field: 'decimal_size',
        label: 'Decimal Size',
        type: 'text',
        sortable: true,
      },
      {
        field: 'include_info',
        label: 'Include Info',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<IPlainObject>[]>((): IBottomAction<IPlainObject>[] => {
    return [];
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="do-info-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={[]}
        onSelectedRows={(selectedRows) => {
          //
        }}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'seq',
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
        bottomActionsConfig={bottomActionsConfig}
      />
    </Paper>
  );
}
export default observer(DoInfoDataTable);
