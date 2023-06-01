import { useEffect, useMemo, useState } from 'react';

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

import ViewDetailModal from './modal/PRO10102120M';

function TestHistoryDataTable() {
  const { AlertStore } = useStore();
  const [isViewDetailModalVisible, setIsViewDetailModalVisible] = useState(false);

  // View Detail Modal Open
  const handleViewDetailModalOpen = () => {
    setIsViewDetailModalVisible(true);
  };

  // View Detail Modal Close
  const handleViewDetailModalClose = () => {
    setIsViewDetailModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      physical_name: 'SHSO',
      testcase_name: 'TstPerformace',
      status: 'FAIL',
      service_group_name: 'SHSG',
      application_name: 'Luke Test',
      creator: 'admin',
      create_time: '2023-05-29 19:33:08',
    },
    {
      physical_name: 'SHSO',
      testcase_name: 'TstPerformace',
      status: 'FAIL',
      service_group_name: 'SHSG',
      application_name: 'Luke Test',
      creator: 'admin',
      create_time: '2023-05-29 19:32:58',
    },
  ];

  // -----------------------------------
  // Config table

  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'physical_name',
        label: 'Resource Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'testcase_name',
        label: 'TestCase Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'status',
        label: 'Result',
        type: 'text',
        sortable: true,
      },
      {
        field: 'service_group_name',
        label: 'ServiceGroup Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'application_name',
        label: 'Application Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'creator',
        label: 'Creator',
        type: 'text',
        sortable: true,
      },
      {
        field: 'create_time',
        label: 'Test Time',
        type: 'text',
        sortable: true,
      },
      {
        field: '',
        label: 'Action',
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
              label: 'Resource Name',
              value: 'physical_name',
            },
            {
              label: 'TestCase Name',
              value: 'testcase_name',
            },
            {
              label: 'Result',
              value: 'status',
            },
            {
              label: 'ServiceGroup Name',
              value: 'service_group_name',
            },
            {
              label: 'Application Name',
              value: 'application_name',
            },
            {
              label: 'Creator',
              value: 'creator',
            },
            {
              label: 'Test Time',
              value: 'create_time',
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
      field: 'physical_name',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="test-history-table"
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
          field: 'physical_name',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* View Detail - Modal */}
      <ViewDetailModal
        visible={isViewDetailModalVisible}
        handleClose={handleViewDetailModalClose}
      />
    </Paper>
  );
}
export default observer(TestHistoryDataTable);
