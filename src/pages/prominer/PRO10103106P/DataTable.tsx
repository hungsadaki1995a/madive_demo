import { MutableRefObject, useMemo, useRef } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import FilterServiceGroupListControl from '@/components/organisms/CmCommonTable/filterControls/FilterServiceGroupListControl';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  TableViewState,
} from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { ProminerResourceDto } from '@/types/dtos/prominerDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { VariableEndpoint } from '@/constants';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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

const PorminerVariableDataTable = observer(({ appId }: { appId: string }) => {
  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'dropdown',
          component: (props: any) => (
            <FilterServiceGroupListControl
              {...props}
              resourceId={appId}
            />
          ),
          name: 'sg_resource_id',
          isTriggerFetchData: true,
        },
      ],
      advanceActions: [
        {
          type: 'filter',
          name: 'prominer-variable-filter',
          defaultValue: 'variable_name',
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
              label: 'Variable Type',
              value: 'variable_type',
            },
            {
              label: 'Class Name',
              value: 'declaring_class',
            },
            {
              label: 'Method Name',
              value: 'declaring_method',
            },
          ],
        },
      ],
    };
  }, [appId]);

  const {
    request,
    isLoading,
    data: prominerVariableList,
  } = useApiQuery<ProminerResourceDto[]>({
    endpoint: VariableEndpoint.getList,
    map: (response) => {
      return response?.dto?.ProminerRscDto || [];
    },
  });

  const requestGetProminerVariableList = (tableState: TableViewState) => {
    const { filter, currentPage, sortBy } = tableState;
    if (!filter.server.app_resource_id) {
      return;
    }
    const payload = {
      searchType: filter.server.sg_resource_id ? 'Sg' : 'App',
      app_resource_id: filter.server.app_resource_id,
      sg_resource_id: filter.server.sg_resource_id,
      pageInfoDto: {
        pageNum: 1,
        pageLength: -1,
      },
      sort: sortBy.field ? true : false,
      sortField: sortBy.field || 'variable_name',
      sortingType: sortBy.direction || 'desc',
    };
    request(payload);
  };

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <Box>
      <CommonTable<ProminerResourceDto>
        allowMultipleSelect={false}
        fieldAsRowId="variable_name"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'variable_name',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
        onTriggerRequest={requestGetProminerVariableList}
        rows={prominerVariableList || []}
        isLoading={isLoading}
      />
    </Box>
  );
});

export default PorminerVariableDataTable;
