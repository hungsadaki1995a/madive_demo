import { MutableRefObject, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

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

import LockUnlockApi from '@/apis/LockUnlockApi';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { LockAndUnlockDto } from '@/types/dtos/lockUnlockDtos';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { LockUnLockEndPoint } from '@/constants';

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
      await LockUnlockApi.unlockResources(selectedRows);
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

  const {
    request,
    isLoading,
    data: lockAndUnlockList,
  } = useApiQuery<LockAndUnlockDto[]>({
    endpoint: LockUnLockEndPoint.getLockList,
    map: (response) => {
      return response?.dto?.LockUnDto || [];
    },
  });

  const requestGetLockAnUnlock = (tableState: TableViewState) => {
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
      sortField: sortBy.field || 'resource_path',
      sortingType: sortBy.direction || 'desc',
    };
    request(payload);
  };

  const tableRef = useRef<ImperativeHandleDto<LockAndUnlockDto>>();
  return (
    <Box>
      <CommonTable<LockAndUnlockDto>
        hasSelectionRows
        allowMultipleSelect
        fieldAsRowId="resource_id"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'resource_path',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<LockAndUnlockDto>>}
        onTriggerRequest={requestGetLockAnUnlock}
        rows={lockAndUnlockList || []}
        isLoading={isLoading}
      />

      <DeleteUnlockModal
        visible={isUnlockResourceModalVisible}
        handleSave={handleUnlockResource}
        handleClose={handleUnlockResourceModalClose}
      />
    </Box>
  );
});

export default LockAndUnlockDataTable;
