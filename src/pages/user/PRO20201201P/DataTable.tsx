import { useMemo, useRef, useState } from 'react';

import { Box, Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import UserApi from '@/apis/UserApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { configUserDto } from '@/types/dtos/userDto';
import { notify } from '@/utils/notify';

import DeleteModal from './modals/DeleteModal';
import FormModal from './modals/FormModal';

const UserManagementDataTable = observer(() => {
  const [isCreateModal, setIsCreateModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [data, setData] = useState<configUserDto | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<configUserDto[]>([]);
  const tableRef = useRef<any>();

  // Handle Form Modal
  const handleCreateModalOpen = () => {
    setData(null);
    setIsCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModal(false);
  };

  const handleUpdateModalOpen = (event: React.MouseEvent, rowData: configUserDto) => {
    setData(rowData);
    setIsCreateModal(true);
  };

  const handleDeleleteModalOpen = () => {
    setIsDeleteModal(true);
  };

  const handleDeleleteModalClose = () => {
    setIsDeleteModal(false);
  };

  const handleSave = async (formData: configUserDto) => {
    if (data) {
      const res: any = await UserApi.editUser(formData);
      if (res?.dto?.value !== 'Success') {
        notify.error(res.dto.value);
      } else {
        notify.success(res.dto.value);
      }
    } else {
      const res: any = await UserApi.createUser(formData);
      if (res?.dto?.value !== 'Success') {
        notify.error(res.dto.value);
      } else {
        notify.success(res.dto.value);
      }
    }
    tableRef.current?.resetPageAndRefresh();
  };

  const handleDelete = async () => {
    const res: any = await UserApi.deleteUser(selectedUsers);
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
      field: 'user_id',
      label: 'User Id',
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
      field: 'email',
      label: 'Email',
      type: 'text',
      sortable: true,
    },
    {
      field: 'user_div',
      label: 'User Div',
      type: 'text',
      sortable: true,
    },
    {
      field: 'tel_no',
      label: 'Phone Number',
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
          label: 'Create New User',
          type: 'button',
          handleClick: () => {
            handleCreateModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create New User',
          },
        },
        {
          type: 'filter',
          name: 'user-filter',
          defaultValue: 'user_id',
          options: [
            {
              label: 'User Id',
              value: 'user_id',
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
      <Paper style={{ padding: '20px', marginTop: '30px' }}>
        <CommonTable<configUserDto>
          hasSelectionRows
          allowMultipleSelect
          query={UserApi.getList}
          tableName="user-table"
          fieldAsRowId="user_id"
          columnsConfig={columnsConfig}
          filterConfig={filterConfig as unknown as IFilterConfig}
          sortDefault={{
            field: 'user_id',
            direction: 'desc',
          }}
          ref={tableRef}
          onRowClick={handleUpdateModalOpen}
        />
      </Paper>
      <FormModal
        visible={isCreateModal}
        handleSave={handleSave}
        handleClose={handleCreateModalClose}
        data={data}
      />
      <DeleteModal
        visible={isDeleteModal}
        handleClose={handleDeleleteModalClose}
        handleSave={handleDelete}
      />
    </Box>
  );
});

export default UserManagementDataTable;
