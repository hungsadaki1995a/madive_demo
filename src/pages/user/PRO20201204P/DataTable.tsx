import { useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import UserApi from '@/apis/UserApi';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { configUserDto } from '@/types/dtos/userDto';
import { notify } from '@/utils/notify';

import DeleteModal from '../PRO20201201P/modals/DeleteModal';

const UserHistoryDataTable = observer(() => {
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<configUserDto[]>([]);
  const tableRef = useRef<any>();

  // Handle Delete
  const handleDeleleteModalOpen = () => {
    setIsDeleteModal(true);
  };

  const handleDeleleteModalClose = () => {
    setIsDeleteModal(false);
  };

  const handleDelete = async () => {
    const res: any = await UserApi.deleteHistory(selectedUsers);
    if (res?.dto?.value !== 'Success') {
      notify.error(res.dto.value);
    } else {
      notify.success(res.dto.value);
    }
    setSelectedUsers([]);
    tableRef.current?.resetPageAndRefresh();
  };

  // Config table
  const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
    {
      field: 'history_type',
      label: 'History Type',
      type: 'text',
      sortable: true,
    },
    {
      field: 'user_id',
      label: 'User ID',
      type: 'text',
      sortable: true,
    },
    {
      field: 'user_name',
      label: 'Name',
      type: 'text',
      sortable: true,
    },
    {
      field: 'user_passwd',
      label: 'PassWd',
      type: 'text',
      sortable: true,
    },
    {
      field: 'email',
      label: 'E-mail',
      type: 'text',
      sortable: true,
    },
    {
      field: 'update_time',
      label: 'Update Time',
      type: 'text',
      sortable: true,
    },
  ];

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: configUserDto[]) => {
            setSelectedUsers(selectedRows);
            handleDeleleteModalOpen();
          },
          checkDisabled: (selectedRows: configUserDto[]) => {
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
      ],
      advanceActions: [
        {
          type: 'filter',
          name: 'user-filter',
          defaultValue: 'user_id',
          options: [
            {
              label: 'User ID',
              value: 'user_id',
            },
            {
              label: 'History Type',
              value: 'history_type',
            },
            {
              label: 'Name',
              value: 'user_name',
            },
            {
              label: 'Email',
              value: 'email',
            },
            {
              label: 'Tel Number',
              value: 'tel_no',
            },
          ],
        },
      ],
    };
  }, []);

  return (
    <Box>
      <CommonTable<configUserDto>
        hasSelectionRows
        allowMultipleSelect
        query={UserApi.getHistoryList}
        fieldAsRowId="history_id"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'user_id',
          direction: 'desc',
        }}
        ref={tableRef}
      />
      <DeleteModal
        visible={isDeleteModal}
        handleClose={handleDeleleteModalClose}
        handleSave={handleDelete}
      />
    </Box>
  );
});

export default UserHistoryDataTable;
