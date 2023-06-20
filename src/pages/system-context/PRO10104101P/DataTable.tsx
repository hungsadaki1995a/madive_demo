import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';

import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import { ICommonTableColumn, IFilterConfig, ImperativeHandleDto } from '@/components/organisms/CmCommonTable/types';

import SystemContextApi from '@/apis/SystemContextApi';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { IPlainObject } from '@/types/common';
import { SystemContextDtos, SystemContextList } from '@/types/dtos/systemContextDtos';

import DeleteSystemContextModal from '@/pages/system-context/PRO10104101P/modal/DeleteSystemContextModal';
import AddSystemContextModal from '@/pages/system-context/PRO10104101P/modal/PRO10104102M';
import EditSystemContextModal from '@/pages/system-context/PRO10104101P/modal/PRO10104103M';
import { EditModal, ISystemContextList } from '@/pages/system-context/PRO10104101P/type';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
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
];

type PropType = {
  dataProp: ISystemContextList;
  isDisabled?: boolean;
};

function SystemContextManagementDataTable(prop: PropType) {
  const { dataProp, isDisabled = false } = prop;
  const [isAddSystemContextModalVisible, setIsAddSystemContextModalVisible] = useState(false);
  const [isEditSystemContextModalVisible, setIsEditSystemContextModalVisible] = useState(false);
  const [isDeleteSystemContextModalVisible, setIsDeleteSystemContextModalVisible] = useState(false);
  const [dataForModal, setDataForModal] = useState<SystemContextDtos>();
  const [editData, setEditData] = useState<EditModal>({
    appName: '',
    node_id: '',
    resource_id: '',
    systemContextName: '',
    key: '',
    value: '',
  });

  useEffect(() => {
    tableRef.current?.changeFilterServer(dataProp);
  }, [dataProp]);

  const handleAddSystemContextModalOpen = () => {
    setIsAddSystemContextModalVisible(true);
  };

  const handleAddSystemContextModalClose = () => {
    setIsAddSystemContextModalVisible(false);
  };

  const handleAddSystemContextModalSave = () => {
    handleAddSystemContextModalClose();
  };

  const handleEditSystemContextModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setEditData({
      appName: dataProp.appName as string,
      node_id: dataProp.node_id,
      resource_id: dataProp.resource_id,
      systemContextName: dataProp.systemContextName,
      key: row.key,
      value: row.value,
    });
    setIsEditSystemContextModalVisible(true);
  };

  const handleEditSystemContextModalClose = () => {
    setEditData({
      appName: '',
      node_id: '',
      resource_id: '',
      systemContextName: '',
      key: '',
      value: '',
    });
    setIsEditSystemContextModalVisible(false);
  };

  const handleEditSystemContextModalSave = () => {
    handleEditSystemContextModalClose();
  };

  const handleDeleteSystemContextModalOpen = (selectedRows: SystemContextDtos) => {
    setDataForModal(selectedRows);
    setIsDeleteSystemContextModalVisible(true);
  };

  const handleDeleteSystemContextModalClose = () => {
    setIsDeleteSystemContextModalVisible(false);
  };

  const handleDeleteSystemContext = () => {
    handleDeleteSystemContextModalClose();
  };

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: SystemContextDtos[]) => {
            handleDeleteSystemContextModalOpen(selectedRows[0]);
          },
          checkDisabled: (selectedRows: SystemContextDtos[]) => {
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
          label: 'Add System Context',
          type: 'button',
          checkDisabled: () => {
            return isDisabled;
          },
          handleClick: () => {
            handleAddSystemContextModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Add System Context',
          },
        },
        {
          type: 'filter',
          name: 'type_of_system_context_list',
          defaultValue: 'key',
          options: [
            {
              label: 'Key',
              value: 'key',
            },
            {
              label: 'Value',
              value: 'value',
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

  const tableRef = useRef<ImperativeHandleDto<SystemContextDtos>>();

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
      <CommonTable<SystemContextList>
        query={SystemContextApi.getTableDataManagement}
        fieldAsRowId="key"
        allowMultipleSelect={false}
        hasSelectionRows
        onRowClick={handleEditSystemContextModalOpen}
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'key',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<SystemContextDtos>>}
      />

      <AddSystemContextModal
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        dataProp={dataProp}
        visible={isAddSystemContextModalVisible}
        handleClose={handleAddSystemContextModalClose}
        handleSave={handleAddSystemContextModalSave}
      />

      <EditSystemContextModal
        dataProp={editData}
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        visible={isEditSystemContextModalVisible}
        handleClose={handleEditSystemContextModalClose}
        handleSave={handleEditSystemContextModalSave}
      />

      <DeleteSystemContextModal
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        dataProp={dataProp}
        dataRow={dataForModal as SystemContextDtos}
        visible={isDeleteSystemContextModalVisible}
        handleSave={handleDeleteSystemContext}
        handleClose={handleDeleteSystemContextModalClose}
      />
    </>
  );
}

export default observer(SystemContextManagementDataTable);
