import { useEffect, useMemo, useState } from 'react';

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

import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import TopButtonModel from '@/types/models/topButtonModel';
import { useStore } from '@/utils';

import CreateNodeModal from './modal/PRO10101102M';
import EditNodeModal from './modal/PRO10101103M';

function NodeManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateNodeModalVisible, setIsCreateNodeModalVisible] = useState(false);
  const [isEditNodeModalVisible, setIsEditNodeModalVisible] = useState(false);

  // Create Meta Modal Open
  const handleCreateNodeModalOpen = () => {
    setIsCreateNodeModalVisible(true);
  };

  // Create Meta Modal Close
  const handleCreateNodeModalClose = () => {
    setIsCreateNodeModalVisible(false);
  };

  // Edit Meta Modal Open
  const handleEditNodeModalOpen = () => {
    setIsEditNodeModalVisible(true);
  };

  // Edit Meta Modal Close
  const handleEditNodeModalClose = () => {
    setIsEditNodeModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      node_id: '27ed7eef630d391a47f7a82c73a9cabe',
      node_type: 'TEST',
      node_name: 'nODE',
      node_ip: '192.168.57.34',
      node_file_port: '8243',
      node_tcp_port: '8081',
      node_path: '',
      node_admin: 'admin',
      node_http_port: '8080',
      node_is_ssl: 'FALSE',
      description: 'This is Test',
    },
    {
      node_id: '2865bb541acc31267a5b86c61445149a',
      node_type: 'TEST',
      node_name: 'dd',
      node_ip: '3',
      node_file_port: '4',
      node_tcp_port: '3',
      node_path: '',
      node_admin: 'admin',
      node_http_port: '333',
      node_is_ssl: 'FALSE',
      description: 'This is Test',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'node_name',
        label: 'Node Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_id',
        label: 'Node ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_ip',
        label: 'IP',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_file_port',
        label: 'File Port',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_http_port',
        label: 'Http Port',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_tcp_port',
        label: 'ProObject Port',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_is_ssl',
        label: 'SSL',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_admin',
        label: 'Admin',
        type: 'text',
        sortable: true,
      },
      {
        field: 'node_type',
        label: 'Node Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'description',
        label: 'Action',
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
              label: 'Node Name',
              value: 'node_name',
            },
            {
              label: 'Node ID',
              value: 'node_id',
            },
            {
              label: 'IP',
              value: 'node_ip',
            },
            {
              label: 'File Port',
              value: 'node_file_port',
            },
            {
              label: 'Http Port',
              value: 'node_http_port',
            },
            {
              label: 'ProObject Port',
              value: 'node_tcp_port',
            },
            {
              label: 'SSL',
              value: 'update_time',
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

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        icon: <DeleteIcon />,
      },
      {
        label: 'Change',
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
      field: 'node_name',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="testcase-management"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        showTopSelect
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'node_name',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* Create Meta - Modal */}
      <CreateNodeModal
        visible={isCreateNodeModalVisible}
        handleClose={handleCreateNodeModalClose}
      />

      {/* Edit Meta - Modal */}
      <EditNodeModal
        visible={isEditNodeModalVisible}
        handleClose={handleEditNodeModalClose}
      />
    </Paper>
  );
}
export default observer(NodeManagementDataTable);
