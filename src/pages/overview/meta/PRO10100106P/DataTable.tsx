import { MutableRefObject, useMemo, useRef, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';
import Cookies from 'universal-cookie';

import CommonTable from '@/components/organisms/CmCommonTable';
import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import { ICommonTableColumn, IFilterConfig, ImperativeHandleDto } from '@/components/organisms/CmCommonTable/types';

import { MetaApi } from '@/apis';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { ReactComponent as UploadIcon } from '@/stylesheets/images/UploadIcon.svg';
import { MetaDtos } from '@/types/dtos/MetaDtos';
import { notify } from '@/utils/notify';

import { USER_INFO_COOKIE } from '@/constants';

import DeleteMetaModal from './modal/DeleteMetaModal';
import CreateMetaModal from './modal/PRO10100107M';
import EditMetaModal from './modal/PRO10100108M';
import ImportExcelModal from './modal/PRO10100109M';

const cookies = new Cookies();
function MetaDataTable() {
  // need more info about how to get it
  const userId = cookies.get(USER_INFO_COOKIE);

  //loading status
  const [isFetching, setIsFetching] = useState<boolean>(false);

  //open status of modal
  const [isCreateMetaModalVisible, setIsCreateMetaModalVisible] = useState(false);
  const [isEditMetaModalVisible, setIsEditMetaModalVisible] = useState(false);
  const [isDeleteMetaModalVisible, setIsDeleteMetaModalVisible] = useState(false);
  const [isImportExcelModalVisible, setImportExcelModalVisible] = useState(false);

  // Selected Data rows
  const [selectedRows, setSelectedRows] = useState<MetaDtos[]>([]);

  //Clicked data row
  const [clickedRows, setClickedRows] = useState<MetaDtos | null>(null);

  //table ref
  const metaTableRef = useRef<ImperativeHandleDto<MetaDtos>>();

  // Create Meta Modal Open
  const handleCreateMetaModalOpen = () => {
    setIsCreateMetaModalVisible(true);
  };

  // Create Meta Modal Close
  const handleCreateMetaModalClose = () => {
    setIsCreateMetaModalVisible(false);
  };

  // Edit Meta Modal Open
  const handleEditMetaModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setClickedRows(row);
    setIsEditMetaModalVisible(true);
  };

  // Edit Meta Modal Close
  const handleEditMetaModalClose = () => {
    setIsEditMetaModalVisible(false);
  };

  // Delete Meta Modal Open
  const handleDeleteMetaModalOpen = () => {
    setIsDeleteMetaModalVisible(true);
  };

  // Delete Meta Modal Close
  const handleDeleteMetaModalClose = () => {
    setIsDeleteMetaModalVisible(false);
  };

  // Delete Meta Execute
  const handleDeleteMeta = async () => {
    setIsFetching(true);
    const res = await MetaApi.MetaListDelete(selectedRows);
    if (res?.value) {
      notify.success('Delete Checked Meta Success!');
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
    await metaTableRef.current?.fetch();
    setIsFetching(false);
    handleDeleteMetaModalClose();
  };

  // Import Excel Modal Open
  const handleImportExcelModalOpen = () => {
    setImportExcelModalVisible(true);
  };

  // Import Excel Modal Close
  const handleImportExcelModalClose = () => {
    setImportExcelModalVisible(false);
  };

  //handle selected table
  const onSelectedRows = (data: MetaDtos[]) => {
    setSelectedRows(data);
  };

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<MetaDtos>[]>(() => {
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

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: () => handleDeleteMetaModalOpen(),
          checkDisabled: (selectedRows: MetaDtos[]) => {
            return selectedRows?.length < 1;
          },
          config: {
            variant: 'contained',
            color: 'secondary',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
        },
      ],
      advanceActions: [
        {
          type: 'filter',
          name: 'meta-filter',
          defaultValue: 'physical_name',
          options: [
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
          ],
        },
        {
          type: 'button',
          label: 'Add Excel',
          handleClick: () => handleImportExcelModalOpen(),
          config: {
            variant: 'text',
            size: 'small',
            startIcon: <UploadIcon />,
            label: 'Add Excel',
            color: 'inherit',
          },
        },
        {
          label: 'Create',
          type: 'button',
          handleClick: () => handleCreateMetaModalOpen(),
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create New Meta',
          },
        },
      ],
    };
  }, []);

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable
        tableName="meta-table"
        fieldAsRowId="resource_id"
        columnsConfig={columnsConfig}
        query={MetaApi.MetaListGet}
        hasSelectionRows
        onRowClick={handleEditMetaModalOpen}
        onSelectedRows={onSelectedRows}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'physical_name',
          direction: SortDirectionTypes.DESC,
        }}
        onSortChange={() => console.log('')}
        ref={metaTableRef as MutableRefObject<ImperativeHandleDto<MetaDtos>>}
      />

      {/* Create Meta - Modal */}
      <CreateMetaModal
        visible={isCreateMetaModalVisible}
        handleClose={handleCreateMetaModalClose}
        creator={userId?.id}
        reFetchData={metaTableRef.current?.fetch}
      />

      {/* Edit Meta - Modal */}
      <EditMetaModal
        visible={isEditMetaModalVisible}
        handleClose={handleEditMetaModalClose}
        data={clickedRows}
        modifier={userId?.id}
        reFetchData={metaTableRef.current?.fetch}
      />

      {/* Delete Meta - Modal */}
      <DeleteMetaModal
        visible={isDeleteMetaModalVisible}
        handleSave={handleDeleteMeta}
        handleClose={handleDeleteMetaModalClose}
        isFetching={isFetching}
      />

      {/* Import Excel - Modal */}
      <ImportExcelModal
        visible={isImportExcelModalVisible}
        handleClose={handleImportExcelModalClose}
        handleRefetch={metaTableRef.current?.fetch}
        handleSave={handleImportExcelModalClose}
      />
    </Paper>
  );
}
export default observer(MetaDataTable);
