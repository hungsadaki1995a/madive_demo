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

import CreateDatasourceModal from './modal/PRO10104105M';
import EditDatasourceModal from './modal/PRO10104106M';

function SystemContextDatasourceDataTable() {
  const { TestCaseStore, AlertStore } = useStore();
  const [isCreateDatasourceModalVisible, setIsCreateDatasourceModalVisible] = useState(false);
  const [isEditDatasourceModalVisible, setIsEditDatasourceModalVisible] = useState(false);

  // Create Datasource Modal Open
  const handleCreateDatasourceModalOpen = () => {
    setIsCreateDatasourceModalVisible(true);
  };

  // Create Datasource Modal Close
  const handleCreateDatasourceModalClose = () => {
    setIsCreateDatasourceModalVisible(false);
  };

  // Edit Datasource Modal Open
  const handleEditDatasourceModalOpen = () => {
    setIsEditDatasourceModalVisible(true);
  };

  // Edit Datasource Modal Close
  const handleEditDatasourceModalClose = () => {
    setIsEditDatasourceModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      key_parameter: 'SYSTEM_CONTEXT_TEST',
      property_value: 'tibero6_dev',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'key_parameter',
        label: 'System Context Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'property_value',
        label: 'Datasource',
        type: 'text',
        sortable: true,
      },
      {
        field: '',
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
              label: 'System Context Name',
              value: 'key_parameter',
            },
            {
              label: 'Datasource',
              value: 'property_value',
            },
            {
              label: 'Action',
              value: '',
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
      label: 'Create New System Context Datasource',
      onClick: () => {
        /** */
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
      field: 'key_parameter',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="system-context-datasource-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="email"
        columnsConfig={columnsConfig}
        rows={rows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        topActionConfig={topActionConfig}
        filterConfig={filterConfig}
        onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'key_parameter',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* Create Datasource - Modal */}
      <CreateDatasourceModal
        visible={isCreateDatasourceModalVisible}
        handleClose={handleCreateDatasourceModalClose}
      />

      {/* Edit Datasource - Modal */}
      <EditDatasourceModal
        visible={isEditDatasourceModalVisible}
        handleClose={handleEditDatasourceModalClose}
      />
    </Paper>
  );
}
export default observer(SystemContextDatasourceDataTable);
