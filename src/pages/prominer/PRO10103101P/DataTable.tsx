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

function PorminerResourceDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      calldepth: 3,
      recycled_bo: 0,
      recycled_so: 0,
      recycled: 0,
      logical_name: 'SHBO',
      resource_type: 'BIZ_OBJECT',
      resource_path: 'com.tmax.bo',
      physical_name: 'SHBO',
      declaring_class: '',
    },
    {
      calldepth: 1,
      recycled_bo: 1,
      recycled_so: 2,
      recycled: 6,
      logical_name: 'SHBO',
      resource_type: 'DTO',
      resource_path: 'com.tmax.dto',
      physical_name: 'SHDO',
      declaring_class: '',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'logical_name',
        label: 'Logical Name',
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
        field: 'resource_type',
        label: 'Resource Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'resource_path',
        label: 'Resource Path',
        type: 'text',
        sortable: true,
      },
      {
        field: 'recycled',
        label: 'Recycled',
        type: 'text',
        sortable: true,
      },
      {
        field: 'recycled_so',
        label: 'Recycled SOs',
        type: 'text',
        sortable: true,
      },
      {
        field: 'recycled_bo',
        label: 'Recycled BOs',
        type: 'text',
        sortable: true,
      },
      {
        field: 'calldepth',
        label: 'Call-Depth',
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
              label: 'Logical Name',
              value: 'logical_name',
            },
            {
              label: 'Physical Name',
              value: 'physical_name',
            },
            {
              label: 'Resource Type',
              value: 'resource_type',
            },
            {
              label: 'Resource Path',
              value: 'resource_path',
            },
            {
              label: 'Recycled',
              value: 'recycled',
            },
            {
              label: 'Recycled SOs',
              value: 'recycled_so',
            },
            {
              label: 'Recycled BOs',
              value: 'recycled_bo',
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
      field: 'logical_name',
      direction: 'desc',
    },
  });

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
        rows={rows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        //topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'logical_name',
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
export default observer(PorminerResourceDataTable);
