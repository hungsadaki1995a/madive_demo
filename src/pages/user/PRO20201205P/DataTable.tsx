import { MutableRefObject, useMemo, useRef, useState } from 'react';

import { Paper } from '@mui/material';
import { observer } from 'mobx-react';

import CommonTable from '@/components/organisms/CmCommonTable';
import {
  ICommonTableColumn,
  IFilterConfig,
  ImperativeHandleDto,
  IPlainObject,
} from '@/components/organisms/CmCommonTable/types';

import GroupManagement from '@/apis/GroupManagement';
import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { ConfigGroupDto, GroupManagementDto } from '@/types/dtos/groupManagementDtos';

import DeleteGroupModal from './modal/DeleteGroupModal';
import CreateGroupModal from './modal/PRO20201206M';
import EditGroupModal from './modal/PRO20201207M';

const columnsConfig: ICommonTableColumn<IPlainObject>[] = [
  {
    field: 'group_id',
    label: 'Group ID',
    type: 'text',
    sortable: true,
  },
  {
    field: 'group_name',
    label: 'Group Name',
    type: 'text',
    sortable: true,
  },
  {
    field: 'description',
    label: 'Description',
    type: 'text',
    sortable: true,
  },
];

const GroupManagementDataTable = observer(() => {
  const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
  const [isEditGroupModalVisible, setIsEditGroupModalVisible] = useState(false);
  const [isDeleteGroupModalVisible, setIsDeleteGroupModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<ConfigGroupDto[]>([]);
  const [editRow, setEditRow] = useState<GroupManagementDto>({ description: '', group_id: '', group_name: '' });

  const handleCreateGroupModalOpen = () => {
    setIsCreateGroupModalVisible(true);
  };

  const handleCreateGroupModalClose = () => {
    setIsCreateGroupModalVisible(false);
  };

  const handleCreateGroupModalSave = () => {
    handleCreateGroupModalClose();
  };

  const handleEditGroupModalOpen = (event: React.MouseEvent<unknown>, row: ConfigGroupDto) => {
    setEditRow({ description: row.description, group_id: row.group_id, group_name: row.group_name });
    setIsEditGroupModalVisible(true);
  };

  const handleEditGroupModalClose = () => {
    setIsEditGroupModalVisible(false);
  };

  const handleEditGroup = () => {
    handleEditGroupModalClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const handleDeleteGroupModalOpen = (selectedRows: any[]) => {
    setIsDeleteGroupModalVisible(true);
  };

  const handleDeleteGroupModalClose = () => {
    setIsDeleteGroupModalVisible(false);
  };

  const handleDeleteGroup = () => {
    handleDeleteGroupModalClose();
  };

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: (selectedRows: ConfigGroupDto[]) => {
            handleDeleteGroupModalOpen(selectedRows);
          },
          checkDisabled: (selectedRows: ConfigGroupDto[]) => {
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
          label: 'Add New Group',
          type: 'button',
          handleClick: () => {
            handleCreateGroupModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Add New Group',
          },
        },
        {
          type: 'filter',
          name: 'type_of_group_management',
          defaultValue: 'group_id',
          options: [
            {
              label: 'Group ID',
              value: 'group_id',
            },
            {
              label: 'Group Name',
              value: 'group_name',
            },
            {
              label: 'Description',
              value: 'description',
            },
          ],
        },
        {
          type: 'simple',
          name: 'search',
          // className: '',
          // label: 'Keyword',
          // icon: <SearchIcon />,
        },
      ],
    };
  }, []);

  const onSelectedRows = (rows: ConfigGroupDto[]) => {
    setSelectedRows([...rows]);
  };

  const tableRef = useRef<ImperativeHandleDto<ConfigGroupDto>>();

  return (
    <Paper style={{ padding: '20px' }}>
      <CommonTable<ConfigGroupDto>
        tableName="group-management-table"
        fieldAsRowId="group_id"
        query={GroupManagement.groupManagement}
        allowMultipleSelect
        onSelectedRows={onSelectedRows}
        hasSelectionRows
        onRowClick={handleEditGroupModalOpen}
        columnsConfig={columnsConfig}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'group_id',
          direction: 'desc',
        }}
        ref={tableRef as MutableRefObject<ImperativeHandleDto<ConfigGroupDto>>}
      />

      {/* Create Group - Modal */}
      <CreateGroupModal
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        visible={isCreateGroupModalVisible}
        handleClose={handleCreateGroupModalClose}
        handleSave={handleCreateGroupModalSave}
      />

      {/* Edit Group - Modal */}
      <EditGroupModal
        dataForEdit={editRow}
        visible={isEditGroupModalVisible}
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
        handleClose={handleEditGroupModalClose}
        handleSave={handleEditGroup}
      />

      {/* Delete Group - Modal */}
      <DeleteGroupModal
        dataForDelete={selectedRows}
        visible={isDeleteGroupModalVisible}
        handleSave={handleDeleteGroup}
        handleClose={handleDeleteGroupModalClose}
        resetPageAndRefresh={tableRef.current?.resetPageAndRefresh}
      />
    </Paper>
  );
});

export default GroupManagementDataTable;
