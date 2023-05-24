import { useStore } from '@/utils';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { UserFormRefType } from './modals/UserForm';
import {
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import useTableDataClient from '@/components/organisms/CmCommonTable/hooks/useTableDataClient';
import UserApi from '@/apis/UserApi';
import CreateModal from './modals/CreateModal';
import UpdateModal from './modals/UpdateModal';
import CommonTable from '@/components/organisms/CmCommonTable';
import UserModel from '@/types/models/userModel';
import TableLayoutCustom from '@/components/organisms/CmCommonTable/layout/custom/TableLayoutCustom';
import TablePaginationCustom from '@/components/organisms/CmCommonTable/paginations/custom/TablePaginationCustom';

function UserManagementDataTable() {
  const { UserStore, AlertStore } = useStore();
  const createModalRef = useRef<UserFormRefType>(null);
  const updateModalRef = useRef<UserFormRefType>(null);

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
          icon: <SearchIcon />,
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

  const topActionConfig = useMemo<ITopAction>(() => {
    return {
      label: 'Add New User',
      onClick: () => createModalRef.current?.show(),
      icon: <AddIcon />,
    };
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
            await UserApi.deleteUser(row);
            UserStore.deleteUser(row.user_id);
            AlertStore.openApiAlert('success', 'Delete Success!');
          });
        },
        checkDisabled: (selectedRs) => selectedRs?.length < 1,
      },
    ];
  }, []);

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
      const data = await UserApi.getUsers();
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
    <>
      <CommonTable
        tableName="user-management"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          console.log('>>>>>>selected row', selectedRows);
        }}
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'user_id',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
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
    </>
  );
}
export default observer(UserManagementDataTable);
