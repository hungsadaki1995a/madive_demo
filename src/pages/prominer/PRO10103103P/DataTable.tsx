import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

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

import { ServiceGroupApi } from '@/apis';
import { IPlainObject } from '@/types/common';
import { ProminerMethodDto } from '@/types/dtos/prominerDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { MethodEndpoint } from '@/constants';

import { View } from '.';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'method_name',
    label: 'Method Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'return_type',
    label: 'Return Type',
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
    field: 'loc',
    label: 'LOC',
    type: 'text',
    sortable: true,
  },
];

const ProminerMethodDataTable = observer(
  ({
    appId,
    handleChangeView,
    handleChangeData,
  }: {
    appId: string;
    handleChangeView: (view: View) => void;
    handleChangeData: (data: ProminerMethodDto) => void;
  }) => {
    const tableRef = useRef<ImperativeHandleDto<ProminerMethodDto>>();

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
            name: 'prominer-resource-filter',
            defaultValue: 'method_name',
            options: [
              {
                label: 'Method Name',
                value: 'method_name',
              },
              {
                label: 'Return Type',
                value: 'return_type',
              },
              {
                label: 'Class Name',
                value: 'declaring_class',
              },
            ],
          },
        ],
      };
    }, [appId]);

    const handleRowClick = (event: React.MouseEvent, rowData: ProminerMethodDto) => {
      handleChangeView(View.DETAIL);
      handleChangeData(rowData);
    };

    useEffect(() => {
      if (appId) {
        (async () => {
          ServiceGroupApi.getSgList(appId);
        })();
      }
    }, [appId]);

    const {
      request,
      isLoading,
      data: prominerMethodList,
    } = useApiQuery<ProminerMethodDto[]>({
      endpoint: MethodEndpoint.getList,
      map: (response) => {
        return response?.dto?.ProminerRscDto || [];
      },
    });

    const requestGetPriminerMethodList = (tableState: TableViewState) => {
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

    return (
      <Box>
        <CommonTable<ProminerMethodDto>
          allowMultipleSelect={false}
          fieldAsRowId="declaring_class"
          columnsConfig={columnsConfig}
          filterConfig={filterConfig as unknown as IFilterConfig}
          sortDefault={{
            field: 'method_name',
            direction: 'desc',
          }}
          ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerMethodDto>>}
          onRowClick={handleRowClick}
          onTriggerRequest={requestGetPriminerMethodList}
          rows={prominerMethodList || []}
          isLoading={isLoading}
        />
      </Box>
    );
  }
);

export default ProminerMethodDataTable;
