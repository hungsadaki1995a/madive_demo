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
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { ProminerResourceDto } from '@/types/dtos/prominerDtos';

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

const PorminerResourceDataTable = observer(({ appId }: { appId: string }) => {
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
            color: 'secondary',
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
        // {
        //   type: 'dropdown',
        //   options: [
        //     {
        //       label: 'ALL',
        //       value: 'ALL',
        //     },
        //     {
        //       label: 'SERVICE OBJECT',
        //       value: 'SERVICE_OBJECT',
        //     },
        //     {
        //       label: 'BIZ OBJECT',
        //       value: 'BIZ_OBJECT',
        //     },
        //     {
        //       label: 'JOB OBJECT',
        //       value: 'JOB_OBJECT',
        //     },
        //   ],
        //   name: 'resource_type',
        // },
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
          // Using component property for own button style
          // component: (props: any) => (
          //   <Button
          //     color="primary"
          //     size="small"
          //     variant="contained"
          //     startIcon={<AddIcon />}
          //     {...props}
          //   >
          //     Create
          //   </Button>
          // ),
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
            // {
            //   label: 'Resource Type',
            //   value: 'resource_type',
            // },
            {
              label: 'Resource Path',
              value: 'resource_path',
            },
          ],
        },
      ],
    };
  }, [appId]);

  const handleRowClick = (event: React.MouseEvent, rowData: ProminerResourceDto) => {
    return;
  };

  const tableRef = useRef<ImperativeHandleDto<ProminerResourceDto>>();

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable<ProminerResourceDto>
        hasSelectionRows
        query={ProminerApi.getResourceList}
        tableName="prominer-resource-table"
        fieldAsRowId="logical_name"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'logical_name',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ProminerResourceDto>>}
        onRowClick={handleRowClick}
      />
    </Paper>
  );
});

export default PorminerResourceDataTable;
