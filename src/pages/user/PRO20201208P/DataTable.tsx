import { useEffect, useMemo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import useTableDataServer from '@/components/organisms/CmCommonTable/hooks/useTableDataServer';
import {
  IBottomAction,
  ICommonTableColumn,
  IFilterConfig,
  IPlainObject,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';

import { useStore } from '@/utils';

import CreateRoleModal from './modal/PRO20201209M';
import EditRoleModal from './modal/PRO20201210M';

function RoleManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateRoleModalVisible, setIsCreateRoleModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);

  // Create Role Modal Open
  const handleCreateRoleModalOpen = () => {
    setIsCreateRoleModalVisible(true);
  };

  // Create Role Modal Close
  const handleCreateRoleModalClose = () => {
    setIsCreateRoleModalVisible(false);
  };

  // Edit Role Modal Open
  const handleEditRoleModalOpen = () => {
    setIsEditRoleModalVisible(true);
  };

  // Edit Role Modal Close
  const handleEditRoleModalClose = () => {
    setIsEditRoleModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      role_id: 'AdminRole',
      role_name: 'AdminRole',
      description: 'AdminRole',
    },
    {
      role_id: 'AdminRole2',
      role_name: 'AdminRole2',
      description: 'AdminRole2',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'role_id',
        label: 'Role ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'role_name',
        label: 'Role Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'description',
        label: 'Description',
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
              label: 'Role ID',
              value: 'role_id',
            },
            {
              label: 'Role Name',
              value: 'role_name',
            },
            {
              label: 'Description',
              value: 'description',
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
      ],
    };
  }, []);

  const topActionConfig = useMemo<ITopAction>(() => {
    return {
      label: 'Create New Role',
      onClick: () => {
        handleCreateRoleModalOpen();
      },
      icon: <AddIcon />,
    };
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<IPlainObject>[]>((): IBottomAction<IPlainObject>[] => {
    return [];
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  const { fetch, rows, sort, filter, pagination } = useTableDataServer<IPlainObject>({
    queryFn: async ({ filter, pagination, sort }) => {
      try {
        //
      } catch (e) {
        AlertStore.openApiAlert('error', 'Fetch data failed');
      }
    },
    queryResult: {
      data: sampleRows,
      total: sampleRows.length,
    },
    paginationParamsDefault: {
      rowsPerPageOptions: [3, 5, 10],
      currentPage: 0,
      rowsPerPage: 3,
      totalCount: 0,
    },
    sortInfoDefault: {
      field: 'role_id',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="role-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'role_id',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* Create Role - Modal */}
      <CreateRoleModal
        visible={isCreateRoleModalVisible}
        handleClose={handleCreateRoleModalClose}
      />

      {/* Edit Role - Modal */}
      <EditRoleModal
        visible={isEditRoleModalVisible}
        handleClose={handleEditRoleModalClose}
      />
    </Paper>
  );
}
export default observer(RoleManagementDataTable);
