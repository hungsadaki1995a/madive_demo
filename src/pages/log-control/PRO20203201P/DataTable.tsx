import { useEffect, useMemo, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig } from '@/components/organisms/CmCommonTable/types';

import { IPlainObject } from '@/types/common';
import { useStore } from '@/utils';

import DeleteLogControlItemModal from './modal/DeleteLogControlItemModal';
import AddLogControlItemModal from './modal/PRO20203202M';
import EditLogControlItemModal from './modal/PRO20203203M';

const sampleRowsData = [
  {
    node_id: 'ca0726f809bae66f33fb36c12a3596fc',
    user_key: '12',
    file_name: '12',
    log_level: 'SEVERE',
    modifier: 'admin',
    description: '12',
  },
  {
    node_id: 'ca0726f809bae66f33fb36c12a3596fc',
    user_key: '?df',
    file_name: '?df',
    log_level: 'WARNING',
    modifier: 'admin',
    description: '?df',
  },
  {
    node_id: 'ca0726f809bae66f33fb36c12a3596fc',
    user_key: 'Key',
    file_name: 'FileName',
    log_level: 'OFF',
    modifier: 'admin',
    description: 'This is luke test',
  },
];

function LogManagementDataTable() {
  const { AlertStore } = useStore();
  const [isCreateLogManagementModalVisible, setIsCreateLogManagementModalVisible] = useState(false);
  const [isEditLogManagementModalVisible, setIsEditLogManagementModalVisible] = useState(false);
  const [isDeleteLogManagementModalVisible, setIsDeleteLogManagementModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Create Log Management Modal Open
  const handleCreateLogManagementModalOpen = () => {
    setIsCreateLogManagementModalVisible(true);
  };

  // Create Log Management Modal Close
  const handleCreateLogManagementModalClose = () => {
    setIsCreateLogManagementModalVisible(false);
  };

  // Edit Log Management Modal Open
  const handleEditLogManagementModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setIsEditLogManagementModalVisible(true);
  };

  // Edit Log Management Modal Close
  const handleEditLogManagementModalClose = () => {
    setIsEditLogManagementModalVisible(false);
  };

  // Delete Log Management Modal Open
  const handleDeleteLogManagementModalOpen = () => {
    setIsDeleteLogManagementModalVisible(true);
  };

  // Delete Log Management Modal Close
  const handleDeleteLogManagementModalClose = () => {
    setIsDeleteLogManagementModalVisible(false);
  };

  // Delete Log Management Excute
  const handleDeleteLogManagement = () => {
    console.log(selectedRows);
  };

  // -----------------------------------
  // Config table

  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'user_key',
        label: 'User Key',
        type: 'text',
        sortable: true,
      },
      {
        field: 'file_name',
        label: 'File Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'log_level',
        label: 'Log Level',
        type: 'text',
        sortable: true,
      },
      {
        field: 'modifier',
        label: 'Modifier',
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
              label: 'User Key',
              value: 'user_key',
            },
            {
              label: 'File Name',
              value: 'file_name',
            },
            {
              label: 'Log Level',
              value: 'log_level',
            },
            {
              label: 'Modifier',
              value: 'modifier',
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
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="user_key"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleEditLogManagementModalOpen}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'user_key',
          direction: 'asc',
        }}
        paginationConfig={{
          rowsPerPageOptions: [10, 25, 50, 100],
          currentPage: 0,
          rowsPerPage: 10,
          totalCount: 0,
          rowsPerPagePosition: 'last',
          onPageChange: (newPageIndex: number) => console.log(newPageIndex),
          onRowsPerPageChange: (newRowsPerPage: number) => console.log(newRowsPerPage),
        }}
      />

      {/* Create Meta - Modal */}
      <AddLogControlItemModal
        visible={isCreateLogManagementModalVisible}
        handleClose={handleCreateLogManagementModalClose}
      />

      {/* Edit Meta - Modal */}
      <EditLogControlItemModal
        visible={isEditLogManagementModalVisible}
        handleClose={handleEditLogManagementModalClose}
      />

      {/* Delete Meta - Modal */}
      <DeleteLogControlItemModal
        visible={isDeleteLogManagementModalVisible}
        handleSave={handleDeleteLogManagement}
        handleClose={handleDeleteLogManagementModalClose}
      />
    </Paper>
  );
}
export default observer(LogManagementDataTable);
