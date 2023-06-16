import { MutableRefObject, useMemo, useRef } from 'react';

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

import ProminerApi from '@/apis/ProminerApi';
import { ProminerResourceDto } from '@/types/dtos/prominerDtos';

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

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable<ProminerResourceDto>
        allowMultipleSelect={false}
        query={ProminerApi.getVariableList}
        fieldAsRowId="variable_name"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'variable_name',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
      />
    </Paper>
  );
});

export default PorminerVariableDataTable;
