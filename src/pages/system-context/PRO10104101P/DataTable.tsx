import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
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

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Add System Context',
      onClick: () => handleAddSystemContextModalOpen(),
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
        onClick: () => handleEditSystemContextModalOpen(),
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
      field: 'key',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <>
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
        addBtnConfig={addBtnConfig}
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
    </>
  );
}
export default observer(SystemContextManagementDataTable);
