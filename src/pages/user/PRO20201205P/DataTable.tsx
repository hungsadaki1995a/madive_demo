import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
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

import DeleteGroupModal from './modal/DeleteGroupModal';
import CreateGroupModal from './modal/PRO20201206M';
import EditGroupModal from './modal/PRO20201207M';

const sampleRowsData = [
  {
    group_id: 'Group1',
    group_name: 'Group1',
    description: 'Group1',
  },
  {
    group_id: 'Group2',
    group_name: 'Group2',
    description: 'Group2',
  },
];

function GroupManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [isDeleteGroupModalVisible, setIsDeleteGroupModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Create Group Modal Open
  const handleCreateGroupModalOpen = () => {
    setIsCreateGroupModalVisible(true);
  };

  // Create Group Modal Close
  const handleCreateGroupModalClose = () => {
    setIsCreateGroupModalVisible(false);
  };

  // Edit Group Modal Open
  const handleEditGroupModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
    setIsEditGroupModalVisible(true);
  };

  // Edit Group Modal Close
  const handleEditGroupModalClose = () => {
    setIsEditGroupModalVisible(false);
  };

  // Delete Group Modal Open
  const handleDeleteGroupModalOpen = () => {
    setIsDeleteGroupModalVisible(true);
  };

  // Delete Group Modal Close
  const handleDeleteGroupModalClose = () => {
    setIsDeleteGroupModalVisible(false);
  };

  // Delete Group Excute
  const handleDeleteGroup = () => {
    console.log(selectedRows);
  };

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'group_id',
        label: 'Group ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'group_name',
        label: 'Group Name',
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
              label: 'Group ID',
              value: 'group_id',
            },
            {
              label: 'Group Name',
              value: 'group_name',
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

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New Group',
      onClick: () => handleCreateGroupModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        onClick: () => handleDeleteGroupModalOpen(),
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
        tableName="group-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="group_id"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleEditGroupModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'group_id',
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

      {/* Create Group - Modal */}
      <CreateGroupModal
        visible={isCreateGroupModalVisible}
        handleClose={handleCreateGroupModalClose}
      />

      {/* Edit Group - Modal */}
      <EditGroupModal
        visible={isEditGroupModalVisible}
        handleClose={handleEditGroupModalClose}
      />

      {/* Delete Group - Modal */}
      <DeleteGroupModal
        visible={isDeleteGroupModalVisible}
        handleSave={handleDeleteGroup}
        handleClose={handleDeleteGroupModalClose}
      />
    </Paper>
  );
}
export default observer(GroupManagementDataTable);
