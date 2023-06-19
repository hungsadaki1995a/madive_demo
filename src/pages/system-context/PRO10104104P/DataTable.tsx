import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, ImperativeHandleDto } from '@/components/organisms/CmCommonTable/types';

import SystemContextApi from '@/apis/SystemContextApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { ConfigDto, EditDatasourceResquest, PropertyList } from '@/types/dtos/systemContextDtos';

import DeleteDatasourceModal from '@/pages/system-context/PRO10104104P/modal/DeleteDatasourceModal';
import CreateDatasourceModal from '@/pages/system-context/PRO10104104P/modal/PRO10104105M';
import EditDatasourceModal from '@/pages/system-context/PRO10104104P/modal/PRO10104106M';
import { IPropertyList } from '@/pages/system-context/PRO10104104P/type';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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
];

type PropType = {
  dataProp: IPropertyList;
  isDisabled?: boolean;
};

function SystemContextDatasourceDataTable(prop: PropType) {
  const { dataProp, isDisabled = false } = prop;
  const [isCreateDatasourceModalVisible, setIsCreateDatasourceModalVisible] = useState(false);
  const [isEditDatasourceModalVisible, setIsEditDatasourceModalVisible] = useState(false);
  const [isDeleteDatasourceModalVisible, setIsDeleteDatasourceModalVisible] = useState(false);
  const [dataForDelete, setDataForDelete] = useState<ConfigDto>();
  const [editData, setEditData] = useState<EditDatasourceResquest>({
    key_parameter: '',
    node_id: '',
    physical_name: '',
    property_key: '',
    property_value: '',
    resource_id: '',
    resource_type: '',
  });

  const handleCreateDatasourceModalOpen = () => {
    setIsCreateDatasourceModalVisible(true);
  };

  const handleCreateDatasourceModalClose = () => {
    setIsCreateDatasourceModalVisible(false);
  };

  const handleEditDatasourceModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setEditData({
      key_parameter: row.key_parameter,
      node_id: dataProp.node_id,
      physical_name: dataProp.physical_name as string,
      property_key: 'APPLICATION_SYSTEM_CONTEXT_{0}_DATASOURCE',
      property_value: row.property_value,
      resource_id: dataProp.resource_id,
      resource_type: 'APPLICATION',
    });
    setIsEditDatasourceModalVisible(true);
  };

  const handleEditDatasourceModalClose = () => {
    setEditData({
      key_parameter: '',
      node_id: '',
      physical_name: '',
      property_key: '',
      property_value: '',
      resource_id: '',
      resource_type: '',
    });
    setIsEditDatasourceModalVisible(false);
  };

  const handleEditDatasourceModalSave = () => {
    handleEditDatasourceModalClose();
  };

  const handleDeleteDatasourceModalOpen = (selectedRows: ConfigDto) => {
    setDataForDelete(selectedRows);
    setIsDeleteDatasourceModalVisible(true);
  };

  const handleDeleteDatasourceModalClose = () => {
    setIsDeleteDatasourceModalVisible(false);
  };

  const handleDeleteDatasource = () => {
    handleDeleteDatasourceModalClose();
  };

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: ConfigDto[]) => {
            handleDeleteDatasourceModalOpen(selectedRows[0]);
          },
          checkDisabled: (selectedRows: ConfigDto[]) => {
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
          label: 'Add Datasource',
          type: 'button',
          checkDisabled: () => {
            return isDisabled;
          },
          handleClick: () => {
            handleCreateDatasourceModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Add Datasource',
          },
        },
        {
          type: 'filter',
          name: 'type_of_system_context_list',
          defaultValue: 'key_parameter',
          options: [
            {
              label: 'System Context Name',
              value: 'key_parameter',
            },
            {
              label: 'Datasource',
              value: 'property_value',
            },
          ],
        },
        {
          type: 'simple',
          name: 'search',
        },
      ],
    };
  }, [isDisabled]);

  const tableRef = useRef<ImperativeHandleDto<ConfigDto>>();
  useEffect(() => {
    tableRef.current?.changeFilterServer(dataProp);
  }, [dataProp]);

  useEffect(() => {
    if (isDisabled) {
      tableRef.current?.fetch();
    }
  }, [isDisabled]);

  return (
    <>
      <CommonTable<PropertyList>
        query={SystemContextApi.getTableDataDatasource}
        fieldAsRowId="key_parameter"
        hasSelectionRows
        allowMultipleSelect={false}
        onRowClick={handleEditDatasourceModalOpen}
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'key_parameter',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ConfigDto>>}
      />

      <CreateDatasourceModal
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        dataProp={dataProp}
        visible={isCreateDatasourceModalVisible}
        handleClose={handleCreateDatasourceModalClose}
      />

      <EditDatasourceModal
        dataProp={editData}
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        visible={isEditDatasourceModalVisible}
        handleClose={handleEditDatasourceModalClose}
        handleSave={handleEditDatasourceModalSave}
      />

      <DeleteDatasourceModal
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        dataProp={dataProp}
        dataRow={dataForDelete as ConfigDto}
        visible={isDeleteDatasourceModalVisible}
        handleSave={handleDeleteDatasource}
        handleClose={handleDeleteDatasourceModalClose}
      />
    </>
  );
}
export default observer(SystemContextDatasourceDataTable);
