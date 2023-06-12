import { MutableRefObject, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

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

import LockUnlockApi from '@/apis/LockUnlockApi';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { LockAndUnlockDto } from '@/types/dtos/lockUnlockDtos';

import DeleteUnlockModal from './modal/DeleteUnlockModal';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'resource_path',
    label: 'Package',
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
    field: 'description',
    label: 'Description',
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
    field: 'user_id',
    label: 'User',
    type: 'text',
    sortable: true,
  },
];

const LockAndUnlockDataTable = observer(({ appId }: { appId: string }) => {
  const [isUnlockResourceModalVisible, setIsUnlockResourceModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<LockAndUnlockDto[]>();

  // Unlock Resource Open
  const handleUnlockResourceModalOpen = () => {
    setIsUnlockResourceModalVisible(true);
  };

  // Unlock Resource Close
  const handleUnlockResourceModalClose = () => {
    setIsUnlockResourceModalVisible(false);
  };

  // Call API to Unlock Resource
  const handleUnlockResource = async () => {
    if (selectedRows) {
      await LockUnlockApi.unlockResouces(selectedRows);
      handleUnlockResourceModalClose();
      tableRef.current?.resetPageAndRefresh();
      toast.success('Unlock succeed!', { position: 'bottom-left' });
    }
  };

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: LockAndUnlockDto[]) => {
            handleUnlockResourceModalOpen();
            setSelectedRows(selectedRows);
          },
          checkDisabled: (selectedRows: LockAndUnlockDto[]) => {
            return selectedRows?.length < 1;
          },
          config: {
            variant: 'contained',
            color: 'secondary',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Unlock',
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
          type: 'filter',
          name: 'resource-lock-filter',
          defaultValue: 'resource_path',
          options: [
            {
              label: 'Package',
              value: 'resource_path',
            },
            {
              label: 'Logical Name',
              value: 'logical_name',
            },
            {
              label: 'Physical Name',
              value: 'physical_name',
            },
            {
              label: 'Resource Type',
              value: 'resource_type',
            },
            {
              label: 'User',
              value: 'user_id',
            },
          ],
        },
      ],
    };
  }, [appId]);

  const tableRef = useRef<ImperativeHandleDto<LockAndUnlockDto>>();
  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable<LockAndUnlockDto>
        hasSelectionRows
        allowMultipleSelect
        query={LockUnlockApi.getLockList}
        tableName="resource-lock-table"
        fieldAsRowId="resource_id"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'resource_path',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<LockAndUnlockDto>>}
      />

      <DeleteUnlockModal
        visible={isUnlockResourceModalVisible}
        handleSave={handleUnlockResource}
        handleClose={handleUnlockResourceModalClose}
      />
    </Paper>
  );
});

export default LockAndUnlockDataTable;
