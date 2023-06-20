import { MutableRefObject, useMemo, useRef } from 'react';

import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import FilterServiceGroupListControl from '@/components/organisms/CmCommonTable/filterControls/FilterServiceGroupListControl';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  TableViewState,
} from '@/components/organisms/CmCommonTable/types';

import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { ProminerResourceDto } from '@/types/dtos/prominerDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { ResourceEndpoint } from '@/constants';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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
    field: 'resource_type',
    label: 'Resource Type',
    type: 'text',
    sortable: true,
  },
  {
    field: 'resource_path',
    label: 'Resource Path',
    type: 'text',
    sortable: true,
  },
  {
    field: 'recycled',
    label: 'Recycled',
    type: 'text',
    sortable: true,
  },
  {
    field: 'recycled_so',
    label: 'Recycled SOs',
    type: 'text',
    sortable: true,
  },
  {
    field: 'recycled_bo',
    label: 'Recycled BOs',
    type: 'text',
    sortable: true,
  },
  {
    field: 'calldepth',
    label: 'Call-Depth',
    type: 'text',
    sortable: true,
  },
];

const ProminerResourceDataTable = observer(({ appId }: { appId: string }) => {
  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: ProminerResourceDto[]) => {
            tableRef.current?.resetPageAndRefresh();
          },
          checkDisabled: (selectedRows: ProminerResourceDto[]) => {
            return selectedRows?.length < 1;
          },
          config: {
            variant: 'contained',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
        },
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
          label: 'Create',
          type: 'button',
          handleClick: (selectedRows: ProminerResourceDto[]) => {
            return;
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create',
          },
        },
        {
          type: 'filter',
          name: 'prominer-resource-filter',
          defaultValue: 'physical_name',
          options: [
            {
              label: 'Physical Name',
              value: 'physical_name',
            },
            {
              label: 'Logical Name',
              value: 'logical_name',
            },
            {
              label: 'Resource Type',
              value: 'resource_type',
            },
            {
              label: 'Resource Path',
              value: 'resource_path',
            },
          ],
        },
      ],
    };
  }, [appId]);

  const {
    request,
    isLoading,
    data: prominerResourceList,
  } = useApiQuery<ProminerResourceDto[]>({
    endpoint: ResourceEndpoint.getList,
    map: (response) => {
      return response?.dto?.ProminerRscDto || [];
    },
  });

  const requestGetProminerResourceList = (tableState: TableViewState) => {
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
      sortField: sortBy.field || 'logical_name',
      sortingType: sortBy.direction || 'desc',
    };
    request(payload);
  };

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <CommonTable<ProminerResourceDto>
      hasSelectionRows
      fieldAsRowId="logical_name"
      columnsConfig={columnsConfig}
      filterConfig={filterConfig as unknown as IFilterConfig}
      sortDefault={{
        field: 'logical_name',
        direction: 'desc',
      }}
      ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
      onTriggerRequest={requestGetProminerResourceList}
      rows={prominerResourceList || []}
      isLoading={isLoading}
    />
  );
});

export default ProminerResourceDataTable;
