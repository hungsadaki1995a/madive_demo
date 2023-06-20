import { useMemo } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { FilterTypes } from '@/components/organisms/CmCommonTable/const';
import { ICommonTableColumn, SearchServerConfig, TableViewState } from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { FieldInfoDto } from '@/types/dtos/doInfoDto';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { DoInfoEndPoint } from '@/constants';

const searchServerConfig: SearchServerConfig = {
  fieldOptions: [
    {
      label: 'Application',
      fieldName: 'app_name',
      type: FilterTypes.TEXT,
    },
    {
      label: 'Service Group',
      fieldName: 'sg_name',
      type: FilterTypes.TEXT,
    },
    {
      label: 'Physical Name',
      fieldName: 'physical_name',
      type: FilterTypes.TEXT,
    },
  ],
};

const DoInfoDataTable = observer(() => {
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'seq',
        label: 'Seq',
        type: 'text',
        sortable: true,
      },
      {
        field: 'do_name',
        label: 'Do Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'depth',
        label: 'Depth',
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
        field: 'length',
        label: 'Length',
        type: 'text',
        sortable: true,
      },
      {
        field: 'array',
        label: 'Array',
        type: 'text',
        sortable: true,
      },
      {
        field: 'comments',
        label: 'Comments',
        type: 'text',
        sortable: true,
      },
      {
        field: 'allow_null',
        label: 'Allow Null',
        type: 'text',
        sortable: true,
      },
      {
        field: 'default_value',
        label: 'Default Value',
        type: 'text',
        sortable: true,
      },
      {
        field: 'masking',
        label: 'Masking',
        type: 'text',
        sortable: true,
      },
      {
        field: 'decimal_size',
        label: 'Decimal Size',
        type: 'text',
        sortable: true,
      },
      {
        field: 'include_info',
        label: 'Include Info',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const {
    request,
    isLoading,
    data: doInfoList,
  } = useApiQuery<FieldInfoDto[]>({
    endpoint: DoInfoEndPoint.doInfo,
    map: (response) => {
      return response?.dto?.FieldInfo || [];
    },
  });

  const requestGetDoInfoList = (tableState: TableViewState) => {
    const { app_name = '', sg_name = '', physical_name = '' } = tableState.filter.server;
    const payload = {
      app_name,
      sg_name,
      physical_name,
    };
    request(payload);
  };

  return (
    <Box>
      <CommonTable<FieldInfoDto>
        fieldAsRowId="node_id"
        columnsConfig={columnsConfig}
        sortDefault={{
          field: 'seq',
          direction: 'asc',
        }}
        searchServerConfig={searchServerConfig}
        onTriggerRequest={requestGetDoInfoList}
        rows={doInfoList || []}
        isLoading={isLoading}
      />
    </Box>
  );
});

export default DoInfoDataTable;
