import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import useTableDataClient from '@/components/organisms/CmCommonTable/hooks/useTableDataClient';
import {
  IAddAction,
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';

import UserApi2 from '@/apis/UserApi';
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

  const filterConfig = useMemo<IFilterConfig>(() => {
    return {
      submitBy: 'enter',
      submitLabel: 'Search',
      filters: [
        {
          type: 'dropdown',
          name: 'filterFieldName',
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
        {
          type: 'simple',
          name: 'search',
          // className: '',
          // label: 'Keyword',
          // icon: <SearchIcon />,
        },
        // {
        //   type: 'simple',
        //   name: 'user_name',
        //   // className: '',
        //   label: 'User name',
        //   icon: <SearchIcon />,
        // },
        // {
        //   type: 'simple',
        //   name: 'email',
        //   // className: '',
        //   label: 'Email',
        //   icon: <SearchIcon />,
        // },
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

  const { fetch, rows, sort, filter, pagination } = useTableDataClient<UserModel>({
    queryFn: async () => {
      UserStore.setIsFetching(true);
      const data = await UserApi2.getUsers();
      UserStore.setIsFetching(false);
      UserStore.setUsers(data?.dto?.ConfigUserDto);
    },
    queryDataResult: UserStore.users,
    paginationParamsDefault: {
      rowsPerPageOptions: [3, 5, 10],
      currentPage: 0,
      rowsPerPage: 3,
      totalCount: 0,
    },
    sortInfoDefault: {
      field: 'user_id',
      direction: 'desc',
    },
    filterLogic,
  });

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="user-management"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="user_id"
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleUpdateModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'user_id',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        //bottomActionsConfig={bottomActionsConfig}
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
