import { useEffect, useMemo } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import useTableDataServer from '@/components/organisms/CmCommonTable/hooks/useTableDataServer';
import {
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';

import { TestCaseApi } from '@/apis';
import { TestCaseDto } from '@/types/dtos/testCaseDtos';
import { useStore } from '@/utils';

function TestCaseDataTable() {
  const { TestCaseStore, AlertStore } = useStore();

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<TestCaseDto>[]>(() => {
    return [
      {
        field: 'testcase_name',
        label: 'TestCase Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'physical_name',
        label: 'Resource Name',
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
        label: 'Create Time',
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
              label: 'TestCase Name',
              value: 'testcase_name',
            },
            {
              label: 'Resource Name',
              value: 'physical_name',
            },
            {
              label: 'ServiceGroup Name',
              value: 'service_group_name',
            },
            {
              label: 'Creator',
              value: 'creator',
            },
            {
              label: 'Create Time',
              value: 'create_time',
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

  const topActionConfig = useMemo<ITopAction>(() => {
    return {
      label: 'Create New TestCase',
      onClick: () => {
        /** */
      },
      icon: <AddIcon />,
    };
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<TestCaseDto>[]>((): IBottomAction<TestCaseDto>[] => {
    return [];
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  const { fetch, rows, sort, filter, pagination } = useTableDataServer<TestCaseDto>({
    queryFn: async ({ filter, pagination, sort }) => {
      try {
        TestCaseStore.setIsFetching(true);
        const data = await TestCaseApi.getTestCases({
          app_resource_id: '0000d8a6e0bd0004b35b8c00dcf79930', // hard code for test
          pageInfoDto: {
            pageLength: pagination.rowsPerPage.toString(),
            pageNum: pagination.currentPage + 1,
            sort: true,
            sortField: `${sort.field || 'testcase_name'}`,
            sortingType: sort.direction || 'asc',
          },
          conditionDto: [
            {
              key: filter['filterFieldName'] || 'testcase_name',
              value: filter['search'] || '',
            },
          ],
        });
        TestCaseStore.setIsFetching(false);
        TestCaseStore.setTestCases(data?.dto?.TestCaseDto, data?.dto?.pagingResultDto.totalNum);
      } catch (e) {
        AlertStore.openApiAlert('error', 'Fetch data failed');
      }
    },
    queryResult: {
      data: TestCaseStore.testCases,
      total: TestCaseStore.total,
    },
    paginationParamsDefault: {
      rowsPerPageOptions: [3, 5, 10],
      currentPage: 0,
      rowsPerPage: 3,
      totalCount: 0,
    },
    sortInfoDefault: {
      field: 'testcase_name',
      direction: 'desc',
    },
  });

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="testcase-management"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'testcase_name',
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
export default observer(TestCaseDataTable);
