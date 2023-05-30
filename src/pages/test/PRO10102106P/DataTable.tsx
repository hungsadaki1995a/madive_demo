import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import { CmButtonDropdownMenu } from '@/components/atoms/CmButton';
import CommonTable from '@/components/organisms/CmCommonTable';
import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import useTableDataServer from '@/components/organisms/CmCommonTable/hooks/useTableDataServer';
import { ICommonTableColumn, IFilterConfig, ITopAction } from '@/components/organisms/CmCommonTable/types';

import { TestCaseApi } from '@/apis';
import {
  TestCaseDeleteResponseDto,
  TestCaseDetailResponseDto,
  TestCaseDto,
  TestCaseListResponseDto,
  TestCaseRequestDto,
} from '@/types/dtos/testCaseDtos';
import { useStore } from '@/utils';

import {
  defaultFilterField,
  paginationDefaultValues,
  sortDefaultValues,
  TestCaseActionEnum,
  testCaseActionsConfig,
  testCaseColumnsDefault,
  testCaseDetailDefault,
} from './const';
import ViewTestResultModal from './modal/PRO10102107M';
import TestCaseDetailModal from './modal/PRO10102108M';
import TestCaseDeleteModal from './modal/TestCaseDeleteModal';
import { ITestCaseDetail } from './types';

const filterConfig: IFilterConfig = {
  submitBy: 'enter',
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
      icon: <SearchIcon />,
    },
  ],
};

function TestCaseDataTable() {
  const { TestCaseStore, AlertStore } = useStore();
  const [isViewTestResultModalVisible, setIsViewTestResultModalVisible] = useState<boolean>(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [testCaseDetailSelected, setTestCaseDetailSelected] = useState<ITestCaseDetail | TestCaseDto>(
    testCaseDetailDefault
  );

  const requestResourceDetail = async (testCaseData: TestCaseDto) => {
    const {
      node_id,
      resource_id,
      create_time,
      header_data,
      input_data,
      input_dto_name,
      node_name,
      output_data,
      physical_name,
      service_group_name,
      testcase_name,
    } = testCaseData;
    const testCaseRequestDto: TestCaseRequestDto = {
      node_id,
      resource_id,
    };
    const response: TestCaseDetailResponseDto = await TestCaseApi.getTestCaseResourceInfo(testCaseRequestDto);
    if (response?.dto) {
      const { node_http_port, node_ip } = response.dto;
      setTestCaseDetailSelected({
        node_ip,
        node_http_port,
        create_time,
        header_data,
        input_data,
        input_dto_name,
        node_name,
        output_data,
        physical_name,
        service_group_name,
        testcase_name,
      });
      setIsOpenModalDetail(true);
    }
  };

  const requestDeleteResource = async (testCaseId: string) => {
    const response: TestCaseDeleteResponseDto = await TestCaseApi.deleteTestCase(testCaseId);
    if (response?.dto) {
      AlertStore.openApiAlert('success', 'Success');
    }
    pagination.currentPage = 0;
    fetchTestCaseList();
  };

  const handleActionChange = (testCaseData: TestCaseDto, actionType: TestCaseActionEnum) => {
    // eslint-disable-next-line no-debugger
    debugger;
    switch (actionType) {
      case TestCaseActionEnum.TEST:
        return handleViewTestResultModalOpen();
      case TestCaseActionEnum.DETAIL:
        return requestResourceDetail(testCaseData);
      case TestCaseActionEnum.DELETE:
        setTestCaseDetailSelected(testCaseData);
        return setIsOpenDeleteModal(true);
      default:
        return null;
    }
  };

  // View Test Result Modal Open
  const handleViewTestResultModalOpen = () => {
    setIsViewTestResultModalVisible(true);
  };

  // View Test Result Modal Close
  const handleViewTestResultModalClose = () => {
    setIsViewTestResultModalVisible(false);
  };

  const onCloseDetailModal = () => {
    setIsOpenModalDetail(false);
  };

  const onCloseDeleteModal = (confirmed = false) => {
    if (confirmed) {
      requestDeleteResource(testCaseDetailSelected.testcase_id || '');
    }
    setIsOpenDeleteModal(false);
  };

  const columnsConfig: ICommonTableColumn<TestCaseDto>[] = [
    ...testCaseColumnsDefault,
    {
      field: 'action',
      label: 'Action',
      type: undefined,
      sortable: false,
      valueRenderAs: (testCaseData: TestCaseDto) => {
        return (
          <CmButtonDropdownMenu
            config={testCaseActionsConfig}
            onChange={(action) => handleActionChange(testCaseData, action)}
          />
        );
      },
    },
  ];

  // -----------------------------------
  // Config table

  const topActionConfig = useMemo<ITopAction>(() => {
    return {
      label: 'Create New TestCase',
      onClick: () => {
        /** */
      },
      icon: <AddIcon />,
    };
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  const {
    fetch: fetchTestCaseList,
    rows,
    sort,
    filter,
    pagination,
  } = useTableDataServer<TestCaseDto>({
    queryFn: async ({ filter, pagination, sort }) => {
      try {
        TestCaseStore.setIsFetching(true);
        const response: TestCaseListResponseDto = await TestCaseApi.getTestCases({
          app_resource_id: '0000d8a6e0bd0004b35b8c00dcf79930', // hard code for test
          pageInfoDto: {
            pageLength: pagination.rowsPerPage.toString(),
            pageNum: pagination.currentPage + 1,
            sort: true,
            sortField: sort.field || defaultFilterField,
            sortingType: sort.direction || SortDirectionTypes.ASC,
          },
          conditionDto: [
            {
              key: filter['filterFieldName'] || 'testcase_name',
              value: filter['search'] || '',
            },
          ],
        });
        const { TestCaseDto, pagingResultDto } = response?.dto || {};
        TestCaseStore.setIsFetching(false);
        TestCaseStore.setTestCases(TestCaseDto, pagingResultDto.totalNum);
      } catch (e) {
        AlertStore.openApiAlert('error', 'Fetch data failed');
      }
    },
    queryResult: {
      data: TestCaseStore.testCases,
      total: TestCaseStore.total,
    },
    paginationParamsDefault: paginationDefaultValues,
    sortInfoDefault: sortDefaultValues,
  });

  useEffect(() => {
    fetchTestCaseList();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="testcase-management"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={rows}
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: defaultFilterField,
          direction: SortDirectionTypes.DESC,
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
      />
      {isOpenModalDetail && (
        <TestCaseDetailModal
          isOpen={isOpenModalDetail}
          handleClose={onCloseDetailModal}
          testCaseDetail={testCaseDetailSelected as ITestCaseDetail}
        />
      )}
      {isOpenDeleteModal && (
        <TestCaseDeleteModal
          isOpen={isOpenDeleteModal}
          handleClose={onCloseDeleteModal}
        />
      )}
      {isViewTestResultModalVisible && (
        <ViewTestResultModal
          visible={isViewTestResultModalVisible}
          handleClose={handleViewTestResultModalClose}
        />
      )}
    </Paper>
  );
}
export default observer(TestCaseDataTable);
