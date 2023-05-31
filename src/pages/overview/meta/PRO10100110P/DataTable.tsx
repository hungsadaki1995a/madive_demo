import { useEffect, useMemo } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import useTableDataServer from '@/components/organisms/CmCommonTable/hooks/useTableDataServer';
import {
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
} from '@/components/organisms/CmCommonTable/types';

import { useStore } from '@/utils';

function MetaHistoryDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      history_type: 'CREATE',
      physical_name: 'trx_dt',
      logical_name: 'Transaction Date',
      field_type: 'double',
      length: '20',
      update_time: '2023-05-04 15:44:28',
      modifier: 'admin',
    },
    {
      history_type: 'CREATE',
      physical_name: 'test1',
      logical_name: 'test1',
      field_type: 'char',
      length: '10',
      update_time: '2023-05-04 16:05:24',
      modifier: 'admin',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'history_type',
        label: 'History Type',
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
        field: 'logical_name',
        label: 'Logical Name',
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
        field: 'length',
        label: 'Length',
        type: 'text',
        sortable: true,
      },
      {
        field: 'update_time',
        label: 'Update Time',
        type: 'text',
        sortable: true,
      },
      {
        field: 'modifier',
        label: 'Modifier',
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
              label: 'History Type',
              value: 'history_type',
            },
            {
              label: 'Physical Name',
              value: 'physical_name',
            },
            {
              label: 'Logical Name',
              value: 'logical_name',
            },
            {
              label: 'Field Type',
              value: 'field_type',
            },
            {
              label: 'Length',
              value: 'length',
            },
            {
              label: 'Update Time',
              value: 'update_time',
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

  const { fetch, rows, sort, filter, pagination } = useTableDataServer<IPlainObject>({
    queryFn: async ({ filter, pagination, sort }) => {
      try {
        //
      } catch (e) {
        AlertStore.openApiAlert('error', 'Fetch data failed');
      }
    },
    queryResult: {
      data: sampleRows,
      total: sampleRows.length,
    },
    paginationParamsDefault: {
      rowsPerPageOptions: [3, 5, 10],
      currentPage: 0,
      rowsPerPage: 3,
      totalCount: 0,
    },
    sortInfoDefault: {
      field: 'history_type',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="meta-history-table"
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
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'history_type',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />
    </Paper>
  );
}
export default observer(MetaHistoryDataTable);
