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

function ProminerVaribleDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      variable_name: 'doCall1',
      declared_type: 'com.tmax.dto.SHDO',
      declaring_class: 'com.tmax.bo.SHBO',
      declaring_method: 'TEST()',
      variable_type: 'DATA_OBJECT',
    },
    {
      variable_name: 'inputDataObject',
      declared_type: 'com.tmax.proobject.model.dataobject.DataObject',
      declaring_class: 'com.tmax.jo.SHJO',
      declaring_method: 'getJobInfo(com.tmax.proobject.model.dataobject.DataObject arg0)',
      variable_type: 'OTHER',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'variable_name',
        label: 'Variable Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'declared_type',
        label: 'Declared Type',
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
        field: 'declaring_method',
        label: 'Method Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'variable_type',
        label: 'Variable Type',
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
              label: 'Variable Name',
              value: 'variable_name',
            },
            {
              label: 'Declared Type',
              value: 'declared_type',
            },
            {
              label: 'Class Name',
              value: 'declaring_class',
            },
            {
              label: 'Method Name',
              value: 'declaring_method',
            },
            {
              label: 'Variable Type',
              value: 'variable_type',
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
      field: 'variable_name',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="prominer-variable-table"
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
          field: 'variable_name',
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
export default observer(ProminerVaribleDataTable);
