import { useMemo, useRef, useState } from 'react';

import { Box, Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import FilterServiceGroupListControl from '@/components/organisms/CmCommonTable/filterControls/FilterServiceGroupListControl';
import { ICommonTableColumn, IFilterConfig, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import TestHistoryApi from '@/apis/TestHistoryApi';
import { TestCaseDto } from '@/types/dtos/testCaseDtos';

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
      primaryActions: [
        {
          type: 'dropdown',
          component: (props: any) => (
            <FilterServiceGroupListControl
              {...props}
              resourceId={selectedValue}
            />
          ),
          name: 'sg_resource_id',
          isTriggerFetchData: true,
        },
      ],
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

  const tableRef = useRef<any>();

  return (
    <Box>
      <Paper style={{ padding: '20px', marginTop: '30px' }}>
        <CommonTable<TestCaseDto>
          query={TestHistoryApi.getListHistory}
          onRowClick={handleClickRow}
          fieldAsRowId="create_time"
          columnsConfig={columnsConfig}
          filterConfig={filterConfig as unknown as IFilterConfig}
          sortDefault={{
            field: 'create_time',
            direction: 'desc',
          }}
          ref={tableRef}
        />
      </Paper>
      <ViewDetailModal
        dataRow={dataClickRow}
        handleSave={handleClose}
        visible={isViewHistoryModalVisible}
      />
    </Box>
  );
});
export default TestHistoryDataTable;
