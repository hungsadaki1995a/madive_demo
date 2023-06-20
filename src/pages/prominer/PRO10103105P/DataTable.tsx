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

import { FieldEndpoint } from '@/constants';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'field_name',
    label: 'Field Name',
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
    field: 'service_group_name',
    label: 'SG Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'field_type',
    label: 'Feild Type',
    type: 'text',
    sortable: true,
  },
];

const ProminerFieldDataTable = observer(({ appId }: { appId: string }) => {
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
          name: 'prominer-field-filter',
          defaultValue: 'field_name',
          options: [
            {
              label: 'Field Name',
              value: 'field_name',
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
              label: 'Field Type',
              value: 'field_type',
            },
          ],
        },
        {
          type: 'simple',
          name: 'search',
        },
      ],
    };
  }, [appId]);

  const {
    request,
    isLoading,
    data: prominerFieldList,
  } = useApiQuery<ProminerResourceDto[]>({
    endpoint: FieldEndpoint.getList,
    map: (response) => {
      return response?.dto?.ProminerRscDto || [];
    },
  });

  const requestGetProminerFieldList = (tableState: TableViewState) => {
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
      sortField: sortBy.field || 'field_name',
      sortingType: sortBy.direction || 'desc',
    };
    request(payload);
  };

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <Box>
      <CommonTable<ProminerResourceDto>
        allowMultipleSelect={false}
        fieldAsRowId="field_name"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'field_name',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
        onTriggerRequest={requestGetProminerFieldList}
        rows={prominerFieldList || []}
        isLoading={isLoading}
      />
    </Box>
  );
});

export default ProminerFieldDataTable;
