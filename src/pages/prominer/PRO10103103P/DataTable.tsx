import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import FilterServiceGroupListControl from '@/components/organisms/CmCommonTable/filterControls/FilterServiceGroupListControl';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  IPlainObject,
} from '@/components/organisms/CmCommonTable/types';

import { ServiceGroupApi } from '@/apis';
import ProminerApi from '@/apis/ProminerApi';
import { ProminerMethodDto } from '@/types/dtos/prominerDtos';

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

    return (
      <Paper style={{ padding: '20px' }}>
        <CommonTable<ProminerMethodDto>
          allowMultipleSelect={false}
          query={ProminerApi.getMethodList}
          fieldAsRowId="declaring_class"
          columnsConfig={columnsConfig}
          filterConfig={filterConfig as unknown as IFilterConfig}
          sortDefault={{
            field: 'method_name',
            direction: 'desc',
          }}
          ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerMethodDto>>}
          onRowClick={handleRowClick}
        />
      </Paper>
    );
  }
);

export default ProminerMethodDataTable;
