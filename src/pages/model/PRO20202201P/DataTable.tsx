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

import CreateDbioModal from './modal/PRO20202202M';
import EditDbioModal from './modal/PRO20202203M';

function DbioDataTable() {
  const { AlertStore } = useStore();
  const [isCreateDbioModalVisible, setIsCreateDbioModalVisible] = useState(false);
  const [isEditDbioModalVisible, setIsEditDbioModalVisible] = useState(false);

  // Create Dbio Modal Open
  const handleCreateDbioModalOpen = () => {
    setIsCreateDbioModalVisible(true);
  };

  // Create Dbio Modal Close
  const handleCreateDbioModalClose = () => {
    setIsCreateDbioModalVisible(false);
  };

  // Edit Dbio Modal Open
  const handleEditDbioModalOpen = () => {
    setIsEditDbioModalVisible(true);
  };

  // Edit Dbio Modal Close
  const handleEditDbioModalClose = () => {
    setIsEditDbioModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
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
      field: 'vender',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="dbio-table"
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
          field: 'vender',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
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
    </Paper>
  );
}
export default observer(DbioDataTable);
