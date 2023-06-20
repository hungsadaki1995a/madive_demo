import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  TableViewState,
} from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { TestCaseDto } from '@/types/dtos/testCaseDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { TestEndpoint } from '@/constants/apiEndpoint';

import { testHistoryDetailDefault } from './const';
import ViewDetailModal from './modal/PRO10102120M';
import { ITestHistoryDetail } from './styles';

const TestHistoryDataTable = observer(({ selectedValue }: { selectedValue: string }) => {
  const [isViewHistoryModalVisible, setViewHistoryModalVisible] = useState(false);
  const [dataClickRow, setDataClickRow] = useState<ITestHistoryDetail>(testHistoryDetailDefault);

  const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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
      label: 'Create Time',
      type: 'text',
      sortable: true,
    },
  ];

  const filterConfig = useMemo(() => {
    return {
      advanceActions: [
        {
          type: 'filter',
          name: 'prominer-resource-filter',
          defaultValue: 'Filter',
          options: [
            {
              label: 'Filter',
              value: 'Filter',
            },
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
          ],
        },
      ],
    };
  }, [selectedValue]);

  const handleClickRow = (event: React.MouseEvent<unknown>, row: any) => {
    setViewHistoryModalVisible(true);
    setDataClickRow(row);
  };

  const handleClose = () => {
    setViewHistoryModalVisible(false);
  };

  const tableRef = useRef<ImperativeHandleDto<TestCaseDto>>();

  const {
    request,
    isLoading,
    data: testHistoryList,
  } = useApiQuery<TestCaseDto[]>({
    endpoint: TestEndpoint.historyList,
    map: (response) => {
      return response?.dto?.TestCaseDto || [];
    },
  });

  const requestGetTestHistory = (tableState: TableViewState) => {
    const { filter, sortBy } = tableState;
    if (!filter.server.app_resource_id) {
      return;
    }
    const payload = {
      app_resource_id: filter.server.app_resource_id,
      pageInfoDto: {
        pageNum: 1,
        pageLength: -1,
      },
      sort: sortBy.field ? true : false,
      sortField: sortBy.field || 'create_time',
      sortingType: sortBy.direction || 'desc',
    };
    request(payload);
  };

  useEffect(() => {
    if (selectedValue) {
      tableRef?.current?.changeFilterServer({ app_resource_id: selectedValue });
    }
  }, [selectedValue]);

  return (
    <Box>
      <CommonTable<TestCaseDto>
        onRowClick={handleClickRow}
        fieldAsRowId="create_time"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'create_time',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<TestCaseDto>>}
        onTriggerRequest={requestGetTestHistory}
        rows={testHistoryList || []}
        isLoading={isLoading}
      />
      <ViewDetailModal
        dataRow={dataClickRow}
        handleSave={handleClose}
        visible={isViewHistoryModalVisible}
      />
    </Box>
  );
});
export default TestHistoryDataTable;
