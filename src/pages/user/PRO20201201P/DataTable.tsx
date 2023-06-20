import { useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig } from '@/components/organisms/CmCommonTable/types';

import UserApi from '@/apis/UserApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { configUserDto } from '@/types/dtos/userDto';
import { RequestType } from '@/utils/const/api';
import useApiClientMutation from '@/utils/hooks/useApiMutation';
import { notify } from '@/utils/notify';

import { UserEndpoint } from '@/constants/apiEndpoint';

import DeleteModal from './modals/DeleteModal';
import FormModal from './modals/FormModal';

const UserManagementDataTable = observer(() => {
  const [isCreateModal, setIsCreateModal] = useState<boolean>(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<configUserDto | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<configUserDto[]>([]);
  const tableRef = useRef<any>();

  const { request: requestCreateUser, isLoading: isLoadingCreate } = useApiClientMutation({
    endpoint: UserEndpoint.getUser,
    method: RequestType.POST,
    onCompleted: (response) => {
      if (response?.dto?.value !== 'Success') {
        notify.error(response.dto.value);
      } else {
        notify.success(response.dto.value);
        tableRef.current?.resetPageAndRefresh();
      }
    },
  });

  const { request: requestEditUser, isLoading: isLoadingEdit } = useApiClientMutation({
    endpoint: UserEndpoint.getUser,
    method: RequestType.PUT,
    onCompleted: (response) => {
      if (response?.dto?.value !== 'Success') {
        notify.error(response.dto.value);
      } else {
        notify.success(response.dto.value);
        tableRef.current?.resetPageAndRefresh();
        setSelectedUsers([]);
      }
    },
  });

  const { request: requestDeleteUser, isLoading: isLoadingDelete } = useApiClientMutation({
    endpoint: UserEndpoint.getList,
    method: RequestType.DELETE,
    onCompleted: (response) => {
      if (response?.dto?.value !== 'Success') {
        notify.error(response.dto.value);
      } else {
        notify.success(response.dto.value);
        tableRef.current?.resetPageAndRefresh();
      }
    },
  });

  // Handle Form Modal
  const handleCreateModalOpen = () => {
    setSelectedUser(null);
    setIsCreateModal(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModal(false);
  };

  const handleUpdateModalOpen = (event: React.MouseEvent, rowData: configUserDto) => {
    setSelectedUser(rowData);
    setIsCreateModal(true);
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModal(false);
  };

  const handleSave = async (formData: configUserDto) => {
    if (selectedUser) {
      requestEditUser({ dto: formData });
    } else {
      requestCreateUser({ dto: formData });
    }
  };

  const handleDelete = async () => {
    requestDeleteUser({
      data: {
        dto: {
          ConfigUserDto: selectedUsers,
        },
      },
    });
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
            handleDeleteModalOpen();
          },
          checkDisabled: (selectedRows: configUserDto[]) => {
            return selectedRows?.length < 1;
          },
          config: {
            variant: 'contained',
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
      <CommonTable<configUserDto>
        hasSelectionRows
        allowMultipleSelect
        query={UserApi.getList}
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
      <FormModal
        visible={isCreateModal}
        handleSave={handleSave}
        handleClose={handleCreateModalClose}
        data={selectedUser}
      />
      <DeleteModal
        visible={isDeleteModal}
        handleClose={handleDeleteModalClose}
        handleSave={handleDelete}
      />
    </Box>
  );
});

export default UserManagementDataTable;
