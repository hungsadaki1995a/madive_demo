import { useEffect, useMemo, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import {
  IAddAction,
  IBottomAction,
  ICommonTableColumn,
  IPlainObject,
  ITopAction,
} from '@/components/organisms/CmCommonTable/types';

import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import TopButtonModel from '@/types/models/topButtonModel';
import { useStore } from '@/utils';

import DeleteNodeModal from './modal/DeleteNodeModal';
import CreateNodeModal from './modal/PRO10101102M';
import EditNodeModal from './modal/PRO10101103M';

const sampleRowsData = [
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

function NodeManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateNodeModalVisible, setIsCreateNodeModalVisible] = useState(false);
  const [isEditNodeModalVisible, setIsEditNodeModalVisible] = useState(false);
  const [isDeleteNodeModalVisible, setIsDeleteNodeModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Create Node Modal Open
  const handleCreateNodeModalOpen = () => {
    setIsCreateNodeModalVisible(true);
  };

  // Create Node Modal Close
  const handleCreateNodeModalClose = () => {
    setIsCreateNodeModalVisible(false);
  };

  // Edit Node Modal Open
  const handleEditNodeModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
    setIsEditNodeModalVisible(true);
  };

  // Edit Node Modal Close
  const handleEditNodeModalClose = () => {
    setIsEditNodeModalVisible(false);
  };

  // Delete Node Modal Open
  const handleDeleteNodeModalOpen = () => {
    setIsDeleteNodeModalVisible(true);
  };

  // Delete Node Modal Close
  const handleDeleteNodeModalClose = () => {
    setIsDeleteNodeModalVisible(false);
  };

  // Delete Node Excute
  const handleDeleteNode = () => {
    console.log(selectedRows);
  };

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

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New Node',
      onClick: () => handleCreateNodeModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        onClick: () => handleDeleteNodeModalOpen(),
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
        tableName="node-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="node_id"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        showTopSelect
        onRowClick={handleEditNodeModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        //filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'node_name',
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

      {/* Create Node - Modal */}
      <CreateNodeModal
        visible={isCreateNodeModalVisible}
        handleClose={handleCreateNodeModalClose}
      />

      {/* Edit Node - Modal */}
      <EditNodeModal
        visible={isEditNodeModalVisible}
        handleClose={handleEditNodeModalClose}
      />

      {/* Delete Node - Modal */}
      <DeleteNodeModal
        visible={isDeleteNodeModalVisible}
        handleSave={handleDeleteNode}
        handleClose={handleDeleteNodeModalClose}
      />
    </Paper>
  );
}
export default observer(NodeManagementDataTable);
