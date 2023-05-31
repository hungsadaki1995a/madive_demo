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

import AddSystemContextModal from './modal/PRO10104102M';
import EditSystemContextModal from './modal/PRO10104103M';

function SystemContextManagementDataTable() {
  const { AlertStore } = useStore();
  const [isAddSystemContextModalVisible, setIsAddSystemContextModalVisible] = useState(false);
  const [isEditSystemContextModalVisible, setIsEditSystemContextModalVisible] = useState(false);

  // Add System Context Modal Open
  const handleAddSystemContextModalOpen = () => {
    setIsAddSystemContextModalVisible(true);
  };

  // Add System Context Modal Close
  const handleAddSystemContextModalClose = () => {
    setIsAddSystemContextModalVisible(false);
  };

  // Edit System Context Modal Open
  const handleEditSystemContextModalOpen = () => {
    setIsEditSystemContextModalVisible(true);
  };

  // Edit System Context Modal Close
  const handleEditSystemContextModalClose = () => {
    setIsEditSystemContextModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      key: 'ㅎㄷㅎ',
      value: 'ㅎㄷㅎ',
    },
    {
      key: 'url',
      value: 'http://192.168.57.34:80/',
    },
    {
      key: 'hello',
      value: '123',
    },
    {
      key: 'QA',
      value: 'TEST',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'key',
        label: 'Key',
        type: 'text',
        sortable: true,
      },
      {
        field: 'value',
        label: 'Value',
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
              label: 'Key',
              value: 'key',
            },
            {
              label: 'Value',
              value: 'value',
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
      label: 'Create New System Context Management',
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
      field: 'key',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="system-context-management-table"
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
          field: 'key',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* Add System Context - Modal */}
      <AddSystemContextModal
        visible={isAddSystemContextModalVisible}
        handleClose={handleAddSystemContextModalClose}
      />

      {/* Edit System Context - Modal */}
      <EditSystemContextModal
        visible={isEditSystemContextModalVisible}
        handleClose={handleEditSystemContextModalClose}
      />
    </Paper>
  );
}
export default observer(SystemContextManagementDataTable);
