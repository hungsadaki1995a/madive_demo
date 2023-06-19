import { MutableRefObject, useMemo, useRef } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import FilterServiceGroupListControl from '@/components/organisms/CmCommonTable/filterControls/FilterServiceGroupListControl';
import { ICommonTableColumn, IFilterConfig, ImperativeHandleDto } from '@/components/organisms/CmCommonTable/types';

import ProminerApi from '@/apis/ProminerApi';
import { IPlainObject } from '@/types/common';
import { ProminerResourceDto } from '@/types/dtos/prominerDtos';

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

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <Box>
      <CommonTable<ProminerResourceDto>
        allowMultipleSelect={false}
        query={ProminerApi.getFieldList}
        fieldAsRowId="field_name"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'field_name',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
      />
    </Box>
  );
});

export default ProminerFieldDataTable;
