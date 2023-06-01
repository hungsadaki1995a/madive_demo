import { useEffect, useMemo, useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Paper } from '@mui/material';
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

import CreateMetaModal from './modal/PRO10100107M';
import EditMetaModal from './modal/PRO10100108M';
import ImportExcelModal from './modal/PRO10100109M';

function MetaDataTable() {
  const { AlertStore } = useStore();
  const [isCreateMetaModalVisible, setIsCreateMetaModalVisible] = useState(false);
  const [isEditMetaModalVisible, setIsEditMetaModalVisible] = useState(false);
  const [isImportExcelModalVisible, setImportExcelModalVisible] = useState(false);

  // Create Meta Modal Open
  const handleCreateMetaModalOpen = () => {
    setIsCreateMetaModalVisible(true);
  };

  // Create Meta Modal Close
  const handleCreateMetaModalClose = () => {
    setIsCreateMetaModalVisible(false);
  };

  // Edit Meta Modal Open
  const handleEditMetaModalOpen = () => {
    setIsEditMetaModalVisible(true);
  };

  // Edit Meta Modal Close
  const handleEditMetaModalClose = () => {
    setIsEditMetaModalVisible(false);
  };

  // Import Excel Modal Open
  const handleImportExcelModalOpen = () => {
    setImportExcelModalVisible(true);
  };

  // Import Excel Modal Close
  const handleImportExcelModalClose = () => {
    setImportExcelModalVisible(false);
  };

  // -----------------------------------
  // Sample Data

  const sampleRows = [
    {
      resource_id: 'c3871e70a298e4449fcb72b7e9cafb3',
      meta_type: 'non-persistent',
      physical_name: 'tst',
      logical_name: 'tst',
      resource_group: 'gcm',
      field_type: 'char',
      length: '20',
      update_time: '2023-05-30 19:33:38',
      comments: 'comment',
    },
    {
      resource_id: 'e5814ae80a298e444cbeb41987a1e179',
      meta_type: 'persistent',
      physical_name: 'trx_dt',
      logical_name: 'Transaction Date',
      resource_group: 'gcm',
      field_type: 'double',
      length: '20',
      update_time: '2023-05-04 15:44:28',
      comments: 'Tran Date',
    },
  ];

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'meta_type',
        label: 'Meta Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'physical_name',
        label: 'Physical Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'logical_name',
        label: 'Logical Name',
        type: 'text',
        sortable: true,
      },
      {
        field: 'resource_group',
        label: 'Resource Group',
        type: 'text',
        sortable: true,
      },
      {
        field: 'field_type',
        label: 'Field Type',
        type: 'text',
        sortable: true,
      },
      {
        field: 'length',
        label: 'Length',
        type: 'text',
        sortable: true,
      },
      {
        field: 'update_time',
        label: 'Update Time',
        type: 'text',
        sortable: true,
      },
      {
        field: 'comments',
        label: 'Comments',
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
              label: 'Meta Type',
              value: 'meta_type',
            },
            {
              label: 'Physical Name',
              value: 'physical_name',
            },
            {
              label: 'Logical Name',
              value: 'logical_name',
            },
            {
              label: 'Resource Group',
              value: 'resource_group',
            },
            {
              label: 'Field Type',
              value: 'field_type',
            },
            {
              label: 'Length',
              value: 'length',
            },
            {
              label: 'Update Time',
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

  const addBtnConfig = useMemo<IAddAction>((): IAddAction => {
    return {
      label: 'Create New Meta',
      onClick: () => handleCreateMetaModalOpen(),
    };
  }, []);

  const topActionConfig = useMemo<ITopAction<TopButtonModel>[]>((): ITopAction<TopButtonModel>[] => {
    return [
      {
        label: 'Delete',
        //onClick: () => createModalRef.current?.show(),
        icon: <DeleteIcon />,
      },
      {
        label: 'Change',
        onClick: () => handleEditMetaModalOpen(),
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
      field: 'meta_type',
      direction: 'desc',
    },
  });

  useEffect(() => {
    //fetch();
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="meta-table"
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
          field: 'meta_type',
          direction: 'asc',
        }}
        onSortChange={sort}
        paginationConfig={pagination}
        // renderPaginationAs={TablePaginationCustom}
        bottomActionsConfig={bottomActionsConfig}
      />

      {/* Create Meta - Modal */}
      <CreateMetaModal
        visible={isCreateMetaModalVisible}
        handleClose={handleCreateMetaModalClose}
      />

      {/* Edit Meta - Modal */}
      <EditMetaModal
        visible={isEditMetaModalVisible}
        handleClose={handleEditMetaModalClose}
      />

      {/* Immort Excel - Modal */}
      <ImportExcelModal
        visible={isImportExcelModalVisible}
        handleClose={handleImportExcelModalClose}
      />
    </Paper>
  );
}
export default observer(MetaDataTable);
