import React, { useMemo, useRef, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, IPlainObject } from '@/components/organisms/CmCommonTable/types';

import DbioApi from '@/apis/DbioApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import DbioModel from '@/types/models/dbioModel';
import { useStore } from '@/utils';

import DeleteDbioModal from './modal/DeleteDbioModal';
import CreateDbioModal from './modal/PRO20202202M';
import EditDbioModal from './modal/PRO20202203M';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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

function DbioDataTable() {
  const { AlertStore, DbioStore } = useStore();
  const [isCreateDbioModalVisible, setIsCreateDbioModalVisible] = useState(false);
  const [isEditDbioModalVisible, setIsEditDbioModalVisible] = useState<boolean>(false);
  const [isDeleteDbioModalVisible, setIsDeleteDbioModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<DbioModel[]>([]);
  const [selectedRow, setSelectedRow] = useState<string>('');
  const tableRef = useRef<any>();

  // Create Dbio Modal Open
  const handleCreateDbioModalOpen = () => {
    setIsCreateDbioModalVisible(true);
  };

  // Create Dbio Modal Close
  const handleCreateDbioModalClose = () => {
    setIsCreateDbioModalVisible(false);
  };

  // Edit Dbio Modal Open
  const handleEditDbioModalOpen = (event: React.MouseEvent<unknown>, row: DbioModel) => {
    setSelectedRow(row?.alias);
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
  const handleDeleteDbioModalClose = (clearSelected?: boolean) => {
    if (clearSelected) setSelectedRows([]);
    setIsDeleteDbioModalVisible(false);
  };

  // -----------------------------------
  // Config table
  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: DbioModel[]) => {
            setSelectedRows(selectedRows);
            handleDeleteDbioModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'secondary',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
          checkDisabled: (selectedRows: DbioModel[]) => {
            //TODO: Check disabled row
            return selectedRows?.length < 1;
          },
        },
      ],
      advanceActions: [
        {
          type: 'button',
          handleClick: (selectedRows: DbioModel[]) => {
            handleCreateDbioModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create New DBIO',
          },
        },
        {
          type: 'filter',
          name: 'dbio-filter',
          defaultValue: 'alias',
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
      ],
    };
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        hasSelectionRows
        query={DbioApi.getDbios}
        tableName="dbio-table"
        fieldAsRowId="alias"
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'alias',
          direction: 'desc',
        }}
        ref={tableRef}
        onRowClick={handleEditDbioModalOpen}
      />
      {/* Create Dbio - Modal */}
      <CreateDbioModal
        visible={isCreateDbioModalVisible}
        handleClose={handleCreateDbioModalClose}
        aliasId={selectedRow}
        fetchTableData={tableRef?.current?.fetch}
      />

      {/* Edit Dbio - Modal */}
      <EditDbioModal
        visible={isEditDbioModalVisible}
        handleClose={handleEditDbioModalClose}
        aliasId={selectedRow}
        fetchTableData={tableRef?.current?.fetch}
      />

      {/* Delete Dbio - Modal */}
      <DeleteDbioModal
        visible={isDeleteDbioModalVisible}
        fetchTableData={tableRef?.current?.fetch}
        handleClose={handleDeleteDbioModalClose}
        selectedRows={selectedRows}
      />
    </Paper>
  );
}
export default observer(DbioDataTable);
