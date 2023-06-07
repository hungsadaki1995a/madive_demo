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

import DeleteDbioModal from './modal/DeleteDbioModal';
import CreateDbioModal from './modal/PRO20202202M';
import EditDbioModal from './modal/PRO20202203M';

const sampleRowsData = [
  {
    vender: 'ORACLE',
    alias: 'ORACLE',
    id: 'ORACLE',
    pw: '123',
    ip: '10.10.10.10',
    port: '8003',
  },
  {
    vender: 'NQT',
    alias: '22113185',
    id: '4185',
    pw: '3185',
    ip: '1111',
    port: '11111',
  },
];

function DbioDataTable() {
  const { AlertStore } = useStore();
  const [isCreateDbioModalVisible, setIsCreateDbioModalVisible] = useState(false);
  const [isEditDbioModalVisible, setIsEditDbioModalVisible] = useState(false);
  const [isDeleteDbioModalVisible, setIsDeleteDbioModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Create Dbio Modal Open
  const handleCreateDbioModalOpen = () => {
    setIsCreateDbioModalVisible(true);
  };

  // Create Dbio Modal Close
  const handleCreateDbioModalClose = () => {
    setIsCreateDbioModalVisible(false);
  };

  // Edit Dbio Modal Open
  const handleEditDbioModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
    setIsEditDbioModalVisible(true);
  };

  // Edit Dbio Modal Close
  const handleEditDbioModalClose = () => {
    setIsEditDbioModalVisible(false);
  };

  // Delete Dbio Modal Open
  const handleDeleteDbioModalOpen = () => {
    setIsDeleteDbioModalVisible(true);
  };

  // Delete Dbio Modal Close
  const handleDeleteDbioModalClose = () => {
    setIsDeleteDbioModalVisible(false);
  };

  // Delete Dbio Excute
  const handleDeleteDbio = () => {
    console.log(selectedRows);
  };

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'vender',
        label: 'Vender',
        type: 'text',
        sortable: true,
      },
      {
        field: 'alias',
        label: 'Alias',
        type: 'text',
        sortable: true,
      },
      {
        field: 'id',
        label: 'ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'ip',
        label: 'IP',
        type: 'text',
        sortable: true,
      },
      {
        field: 'port',
        label: 'Port',
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
              label: 'Vender',
              value: 'vender',
            },
            {
              label: 'Alias',
              value: 'alias',
            },
            {
              label: 'ID',
              value: 'id',
            },
            {
              label: 'IP',
              value: 'ip',
            },
            {
              label: 'Port',
              value: 'port',
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
      label: 'Create New DBIO',
      onClick: () => handleCreateDbioModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        onClick: () => handleDeleteDbioModalOpen(),
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
        tableName="dbio-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="vender"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleEditDbioModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'vender',
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

      {/* Create Dbio - Modal */}
      <CreateDbioModal
        visible={isCreateDbioModalVisible}
        handleClose={handleCreateDbioModalClose}
      />

      {/* Edit Dbio - Modal */}
      <EditDbioModal
        visible={isEditDbioModalVisible}
        handleClose={handleEditDbioModalClose}
      />

      {/* Delete Dbio - Modal */}
      <DeleteDbioModal
        visible={isDeleteDbioModalVisible}
        handleSave={handleDeleteDbio}
        handleClose={handleDeleteDbioModalClose}
      />
    </Paper>
  );
}
export default observer(DbioDataTable);
