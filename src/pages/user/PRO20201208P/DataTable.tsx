import { useEffect, useMemo, useState } from 'react';

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

import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import TopButtonModel from '@/types/models/topButtonModel';
import { useStore } from '@/utils';

import DeleteRoleModal from './modal/DeleteRoleModal';
import CreateRoleModal from './modal/PRO20201209M';
import EditRoleModal from './modal/PRO20201210M';

const sampleRowsData = [
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

function RoleManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateRoleModalVisible, setIsCreateRoleModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [isDeleteRoleModalVisible, setIsDeleteRoleModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Create Role Modal Open
  const handleCreateRoleModalOpen = () => {
    setIsCreateRoleModalVisible(true);
  };

  // Create Role Modal Close
  const handleCreateRoleModalClose = () => {
    setIsCreateRoleModalVisible(false);
  };

  // Edit Role Modal Open
  const handleEditRoleModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setIsEditRoleModalVisible(true);
  };

  // Edit Role Modal Close
  const handleEditRoleModalClose = () => {
    setIsEditRoleModalVisible(false);
  };

  // Delete Role Modal Open
  const handleDeleteRoleModalOpen = () => {
    setIsDeleteRoleModalVisible(true);
  };

  // Delete Role Modal Close
  const handleDeleteRoleModalClose = () => {
    setIsDeleteRoleModalVisible(false);
  };

  // Delete Role Excute
  const handleDeleteRole = () => {
    console.log(selectedRows);
  };

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
          // icon: <SearchIcon />,
        },
      ],
    };
  }, []);

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New Role',
      onClick: () => handleCreateRoleModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        onClick: () => handleDeleteRoleModalOpen(),
        icon: <DeleteIcon />,
      },
    ];
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<IPlainObject>[]>((): IBottomAction<IPlainObject>[] => {
    return [];
  }, []);

  const onSelectedRows = (rows: any) => {
    setSelectedRows([...rows]);
  };

  // ------------------------------------------------------------------------------------
  // Handle Data

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="role-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="role_id"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleEditRoleModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'role_id',
          direction: 'asc',
        }}
        onSortChange={() => console.log('')}
        paginationConfig={{
          rowsPerPageOptions: [10, 25, 50, 100],
          currentPage: 0,
          rowsPerPage: 10,
          totalCount: 0,
          rowsPerPagePosition: 'last',
          onPageChange: (newPageIndex: number) => console.log(newPageIndex),
          onRowsPerPageChange: (newRowsPerPage: number) => console.log(newRowsPerPage),
        }}
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

      {/* Delete Role - Modal */}
      <DeleteRoleModal
        visible={isDeleteRoleModalVisible}
        handleSave={handleDeleteRole}
        handleClose={handleDeleteRoleModalClose}
      />
    </Paper>
  );
}
export default observer(RoleManagementDataTable);
