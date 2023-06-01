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

function HistoryDataTable() {
  const { AlertStore } = useStore();

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      history_id: '664bb4890a298e447bfca792c907e492',
      history_type: 'CREATE',
      user_id: '00_?',
      user_passwd: '?',
      user_name: '?',
      email: 'duongtantien1@gmail.com',
      tel_no: 'a',
      update_time: '2023-05-29 15:56:57',
    },
    {
      history_id: '66a0b2e40a298e445a228c757993b339',
      history_type: 'DELETE',
      user_id: '00_?q',
      user_passwd: 'q?',
      user_name: 'q?',
      email: 'duongtantien1@gmail.com',
      tel_no: 'q?',
      update_time: '2023-05-29 17:29:47',
    },
    {
      history_id: '712c8dc10a298e441c6885a1bd51129f',
      history_type: 'DELETE',
      user_id: '00_1123',
      user_passwd: 'dsadsa',
      user_name: 'dsadsad',
      email: 'd@gmail.com',
      tel_no: '321321321',
      update_time: '2023-05-31 18:38:45',
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
        field: 'user_id',
        label: 'User ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'user_name',
        label: 'Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'user_passwd',
        label: 'PassWd',
        type: 'text',
        sortable: true,
      },
      {
        field: 'email',
        label: 'E-mail',
        type: 'text',
        sortable: true,
      },
      {
        field: 'tel_no',
        label: 'Thelephone No.',
        type: 'text',
        sortable: true,
      },
      {
        field: 'update_time',
        label: 'Update Time',
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
              label: 'User ID',
              value: 'user_id',
            },
            {
              label: 'Name',
              value: 'user_name',
            },
            {
              label: 'PassWd',
              value: 'user_passwd',
            },
            {
              label: 'E-mail',
              value: 'email',
            },
            {
              label: 'Thelephone No.',
              value: 'tel_no',
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
        tableName="user-history-table"
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
export default observer(HistoryDataTable);
