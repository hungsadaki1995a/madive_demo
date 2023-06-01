import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import useTableDataServer from '@/components/organisms/CmCommonTable/hooks/useTableDataServer';
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

import CreateGroupModal from './modal/PRO20201206M';
import EditGroupModal from './modal/PRO20201207M';

function GroupManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);

  // Create Group Modal Open
  const handleCreateGroupModalOpen = () => {
    setIsCreateGroupModalVisible(true);
  };

  // Create Group Modal Close
  const handleCreateGroupModalClose = () => {
    setIsCreateGroupModalVisible(false);
  };

  // Edit Group Modal Open
  const handleEditGroupModalOpen = () => {
    setIsEditGroupModalVisible(true);
  };

  // Edit Group Modal Close
  const handleEditGroupModalClose = () => {
    setIsEditGroupModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
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
        icon: <DeleteIcon />,
      },
      {
        label: 'Change',
        onClick: () => handleEditGroupModalOpen(),
      },
    ];
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
      field: 'group_id',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="group-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'group_id',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
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
    </Paper>
  );
}
export default observer(GroupManagementDataTable);
