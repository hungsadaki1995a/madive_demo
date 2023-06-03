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

import DeleteSystemContextModal from './modal/DeleteSystemContextModal';
import AddSystemContextModal from './modal/PRO10104102M';
import EditSystemContextModal from './modal/PRO10104103M';

const sampleRowsData = [
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

function SystemContextManagementDataTable() {
  const { AlertStore } = useStore();
  const [isAddSystemContextModalVisible, setIsAddSystemContextModalVisible] = useState(false);
  const [isEditSystemContextModalVisible, setIsEditSystemContextModalVisible] = useState(false);
  const [isDeleteSystemContextModalVisible, setIsDeleteSystemContextModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [sampleRows, setSampleRows] = useState(sampleRowsData);

  // Add System Context Modal Open
  const handleAddSystemContextModalOpen = () => {
    setIsAddSystemContextModalVisible(true);
  };

  // Add System Context Modal Close
  const handleAddSystemContextModalClose = () => {
    setIsAddSystemContextModalVisible(false);
  };

  // Edit System Context Modal Open
  const handleEditSystemContextModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    console.log(event);
    console.log(row);
    setIsEditSystemContextModalVisible(true);
  };

  // Edit System Context Modal Close
  const handleEditSystemContextModalClose = () => {
    setIsEditSystemContextModalVisible(false);
  };

  // Delete System Context Modal Open
  const handleDeleteSystemContextModalOpen = () => {
    setIsDeleteSystemContextModalVisible(true);
  };

  // Delete System Context Modal Close
  const handleDeleteSystemContextModalClose = () => {
    setIsDeleteSystemContextModalVisible(false);
  };

  // Delete System Context Excute
  const handleDeleteSystemContext = () => {
    console.log(selectedRows);
  };

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
        onClick: () => handleDeleteSystemContextModalOpen(),
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
    <>
      <CommonTable
        tableName="system-context-management-table"
        // renderLayoutAs={TableLayoutCustom}
        fieldAsRowId="key"
        columnsConfig={columnsConfig}
        rows={sampleRows}
        hasSelectionRows
        onSelectedRows={onSelectedRows}
        onRowClick={handleEditSystemContextModalOpen}
        topActionConfig={topActionConfig}
        addBtnConfig={addBtnConfig}
        filterConfig={filterConfig}
        //onFilterTriggerQuery={filter}
        sortDefault={{
          field: 'key',
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

      {/* Delete System Context - Modal */}
      <DeleteSystemContextModal
        visible={isDeleteSystemContextModalVisible}
        handleSave={handleDeleteSystemContext}
        handleClose={handleDeleteSystemContextModalClose}
      />
    </>
  );
}
export default observer(SystemContextManagementDataTable);
