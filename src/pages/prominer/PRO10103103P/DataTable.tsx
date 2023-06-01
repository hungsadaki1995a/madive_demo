import { useEffect, useMemo } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import {
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
} from '@/components/organisms/CmCommonTable/types';

import { useStore } from '@/utils';

function ProminerMethodDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      return_type: 'void',
      method_name: 'TEST()',
      declaring_class: 'com.tmax.bo.SHBO',
      service_group_name: 'SHSG',
      loc: 29,
    },
    {
      return_type: 'com.tmax.dto.SHDO',
      method_name: 'service(java.lang.Object arg0)',
      declaring_class: 'com.tmax.so.SHDeferredSO',
      service_group_name: 'SHSG',
      loc: 32,
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'method_name',
        label: 'Method Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'return_type',
        label: 'Return Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'declaring_class',
        label: 'Class Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'service_group_name',
        label: 'SG Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'loc',
        label: 'LOC',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const filterConfig = useMemo<IFilterConfig>(() => {
    return {
      submitBy: 'enter',
      submitLabel: 'Search',
      filters: [
        {
          type: 'dropdown',
          name: 'filterFieldName',
          options: [
            {
              label: 'Method Name',
              value: 'method_name',
            },
            {
              label: 'Return Type',
              value: 'return_type',
            },
            {
              label: 'Class Name',
              value: 'declaring_class',
            },
            {
              label: 'SG Name',
              value: 'service_group_name',
            },
            {
              label: 'LOC',
              value: 'loc',
            },
          ],
        },
        {
          type: 'simple',
          name: 'search',
          // className: '',
          // label: 'Keyword',
          icon: <SearchIcon />,
        },
      ],
    };
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
        tableName="prominer-method-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        //topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'method_name',
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
export default observer(ProminerMethodDataTable);
