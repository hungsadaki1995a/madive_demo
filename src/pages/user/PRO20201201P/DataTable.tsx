import { useCallback, useMemo, useRef, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import {
  IAddAction,
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';

import UserApi2 from '@/apis/UserApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import TopButtonModel from '@/types/models/topButtonModel';
import UserModel from '@/types/models/userModel';
import { useStore } from '@/utils';

import DeleteModal from './modals/DeleteModal';
import CreateModal from './modals/PRO20201202M';
import UpdateModal from './modals/PRO20201203M';
import { UserFormRefType } from './modals/UserForm';

function UserManagementDataTable() {
  const { UserStore, AlertStore } = useStore();
  const createModalRef = useRef<UserFormRefType>(null);
  const updateModalRef = useRef<UserFormRefType>(null);
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  // Edit User Modal Open
  const handleUpdateModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
    updateModalRef.current?.show(row);
  };

  // Delete User Modal Open
  const handleDeleteUserModalOpen = () => {
    setIsDeleteUserModalVisible(true);
  };

  // Delete User Modal Close
  const handleDeleteUserModalClose = () => {
    setIsDeleteUserModalVisible(false);
  };

  // Delete User Excute
  const handleDeleteUser = () => {
    console.log(selectedRows);
  };

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<UserModel>[]>(() => {
    return [
      {
        field: 'user_id',
        label: 'User Id',
        type: 'text',
        sortable: true,
      },
      {
        field: 'user_name',
        label: 'User Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'email',
        label: 'Email',
        type: 'text',
        sortable: true,
        valueRenderAs: (rowData) => {
          return (
            <b
              style={{
                color: 'red',
              }}
            >
              {rowData.email}
            </b>
          );
        },
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
  }, []);

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: UserModel[]) => {
            handleDeleteUserModalOpen();
          },
          checkDisabled: (selectedRows: UserModel[]) => {
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
          type: 'button',
          handleClick: (selectedRows: UserModel[]) => {
            createModalRef.current?.show();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create New User',
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
          name: 'user-list-filter',
          defaultValue: 'user_name',
          options: [
            {
              label: 'User Name',
              value: 'user_name',
            },
            {
              label: 'Email',
              value: 'email',
            },
          ],
        },
      ],
    };
  }, []);

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New User',
      onClick: () => createModalRef.current?.show(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        onClick: () => handleDeleteUserModalOpen(),
        icon: <DeleteIcon />,
      },
    ];
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<UserModel>[]>((): IBottomAction<UserModel>[] => {
    return [
      {
        label: 'Change',
        onClick: (selectedRows: UserModel[]) => {
          updateModalRef.current?.show(selectedRows[0]);
        },
        checkDisabled: (selectedRs) => selectedRs?.length === 0 || selectedRs?.length > 1,
      },
      {
        label: 'Delete',
        onClick: (selectedRows: UserModel[]) => {
          selectedRows?.forEach(async (row) => {
            await UserApi2.deleteUser(row);
            UserStore.deleteUser(row.user_id);
            AlertStore.openApiAlert('success', 'Delete Success!');
          });
        },
        checkDisabled: (selectedRs) => selectedRs?.length < 1,
      },
    ];
  }, []);

  const onSelectedRows = (rows: any) => {
    setSelectedRows([...rows]);
  };

  // ------------------------------------------------------------------------------------
  // Handle Data

  const filterLogic = useCallback((row: any, filterValues: IPlainObject) => {
    const temp = { ...row };
    return !!(temp as any)[filterValues.filterFieldName]?.toLowerCase()?.includes(filterValues.search?.toLowerCase());
  }, []);

  // const filterLogic = useCallback((row: any, filterValues: IPlainObject) => {
  //   const temp = { ...row };
  //   return row.user_name.includes(filterValues.user_name || '') && row.email.includes(filterValues.email || '');
  // }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable<UserModel>
        tableName="user-management"
        query={UserApi2.getUsers}
        fieldAsRowId="user_id"
        columnsConfig={columnsConfig}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleUpdateModalOpen}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'user_id',
          direction: 'asc',
        }}
      />
      <CreateModal
        ref={createModalRef}
        onSuccess={(data) => {
          if (data) {
            UserStore.addUser(data);
          }
        }}
      />
      <UpdateModal
        ref={updateModalRef}
        onSuccess={(data) => {
          if (data) {
            UserStore.updateUser(data);
          }
        }}
      />
      <DeleteModal
        visible={isDeleteUserModalVisible}
        handleSave={handleDeleteUser}
        handleClose={handleDeleteUserModalClose}
      />
    </Paper>
  );
}
export default observer(UserManagementDataTable);
