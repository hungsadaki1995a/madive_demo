import { MutableRefObject, useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import Cookies from 'universal-cookie';

import CommonTable from '@/components/organisms/CmCommonTable';
import { FilterTypes, SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  SearchServerConfig,
  TableDataResponseDto,
  TableViewState,
} from '@/components/organisms/CmCommonTable/types';

import { MetaApi } from '@/apis';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { ReactComponent as UploadIcon } from '@/stylesheets/images/UploadIcon.svg';
import { MetaDtos } from '@/types/dtos/MetaDtos';
import { IOriginalResponse } from '@/types/http';
import { notify } from '@/utils/notify';

import { USER_INFO_COOKIE } from '@/constants';
import { MetaEndPoint } from '@/constants/apiEndpoint';

import DeleteMetaModal from './modal/DeleteMetaModal';
import CreateMetaModal from './modal/PRO10100107M';
import EditMetaModal from './modal/PRO10100108M';
import ImportExcelModal from './modal/PRO10100109M';

const searchServerConfig: SearchServerConfig = {
  fieldOptions: [
    {
      label: 'Physical Name',
      fieldName: 'physical_name',
      type: FilterTypes.TEXT,
    },
    {
      label: 'Logical Name',
      fieldName: 'logical_name',
      type: FilterTypes.TEXT,
    },
    {
      label: 'Resource Group',
      fieldName: 'resource_group',
      type: FilterTypes.TEXT,
    },
  ],
};

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

  const convertPayloadRequest = (tableState: TableViewState) => {
    const { sort, sortField, sortingType } = tableState;
    const conditionDto = Object.entries(tableState.filter.server).map(([key, value]) => ({ key, value }));
    const payload = {
      pageInfoDto: {
        pageNum: 1,
        pageLength: -1,
      },
      sort,
      sortField,
      sortingType,
      conditionDto: conditionDto,
    };
    return payload;
  };

  const convertResponse = (response: IOriginalResponse): TableDataResponseDto<MetaDtos> => {
    return { data: response?.dto?.MetaDto || [], total: response?.dto?.pagingResultDto?.totalNum || 0 };
  };

  return (
    <Box>
      <CommonTable<MetaDtos>
        fieldAsRowId="resource_id"
        hasSelectionRows
        onRowClick={handleEditMetaModalOpen}
        onSelectedRows={onSelectedRows}
        searchServerConfig={searchServerConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        columnsConfig={columnsConfig}
        sortDefault={{
          field: 'physical_name',
          direction: SortDirectionTypes.DESC,
        }}
        endpoint={MetaEndPoint.metaList}
        convertPayloadRequest={convertPayloadRequest}
        convertResponse={convertResponse}
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
    </Box>
  );
}
export default observer(MetaDataTable);
