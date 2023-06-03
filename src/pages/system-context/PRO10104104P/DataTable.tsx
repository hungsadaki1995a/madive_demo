import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
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
  const handleEditDatasourceModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
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

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New Datasource',
      onClick: () => handleCreateDatasourceModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        icon: <DeleteIcon />,
      },
    ];
  }, []);

  const bottomActionsConfig = useMemo<IBottomAction<IPlainObject>[]>((): IBottomAction<IPlainObject>[] => {
    return [];
  }, []);

  // ------------------------------------------------------------------------------------
  // Handle Data

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <>
      <CommonTable
        tableName="system-context-datasource-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="field"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={(selectedRows) => {
          //
        }}
        onRowClick={handleEditDatasourceModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'key_parameter',
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
    </>
  );
}
export default observer(SystemContextDatasourceDataTable);
