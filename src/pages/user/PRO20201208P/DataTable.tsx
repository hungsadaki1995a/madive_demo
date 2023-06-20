import { useMemo, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import Cookies from 'universal-cookie';

import CommonTable from '@/components/organisms/CmCommonTable';
import { SortDirectionTypes } from '@/components/organisms/CmCommonTable/const';
import { ICommonTableColumn, IFilterConfig } from '@/components/organisms/CmCommonTable/types';

import { ReactComponent as AddIcon } from '@/stylesheets/images/AddIcon.svg';
import { ReactComponent as DeleteIcon } from '@/stylesheets/images/DeleteIcon.svg';
import { ConfigRoleDto } from '@/types/dtos/configRoleDtos';
import RoleModel from '@/types/models/roleModel';
import { useStore } from '@/utils';
import useApiQuery from '@/utils/hooks/useApiQuery';

import { USER_INFO_COOKIE } from '@/constants';
import { RoleEndpoint } from '@/constants/apiEndpoint';

import DeleteRoleModal from './modal/DeleteRoleModal';
import CreateRoleModal from './modal/PRO20201209M';
import EditRoleModal from './modal/PRO20201210M';

const RoleManagementDataTable = observer(() => {
  const { AlertStore } = useStore();
  const [isCreateRoleModalVisible, setIsCreateRoleModalVisible] = useState(false);
  const [isEditRoleModalVisible, setIsEditRoleModalVisible] = useState(false);
  const [isDeleteRoleModalVisible, setIsDeleteRoleModalVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<RoleModel>();
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState<string>('');
  const tableRef = useRef<any>();
  const cookies = new Cookies();
  const userInfo = cookies.get(USER_INFO_COOKIE);

  // Create Role Modal Open
  const handleCreateRoleModalOpen = () => {
    setIsCreateRoleModalVisible(true);
  };

  // Create Role Modal Close
  const handleCreateRoleModalClose = () => {
    setIsCreateRoleModalVisible(false);
  };

  // Edit Role Modal Open
  const handleEditRoleModalOpen = (event: React.MouseEvent<unknown>, row: any) => {
    setSelectedRow(row);
    setIsEditRoleModalVisible(true);
  };

  // Edit Role Modal Close
  const handleEditRoleModalClose = () => {
    setIsEditRoleModalVisible(false);
  };

  // Delete Role Modal Open
  const handleDeleteRoleModalOpen = async () => {
    setIsDeleteRoleModalVisible(true);
  };

  // Delete Role Modal Close
  const handleDeleteRoleModalClose = () => {
    setIsDeleteRoleModalVisible(false);
  };

  // -----------------------------------
  // Config table
  const columnsConfig = useMemo<ICommonTableColumn<ConfigRoleDto>[]>(() => {
    return [
      {
        field: 'role_id',
        label: 'Role ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'role_name',
        label: 'Role Name',
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
  }, []);

  const filterConfig = useMemo(() => {
    return {
      primaryActions: [
        {
          type: 'button',
          handleClick: async (selectedRows: RoleModel[]) => {
            setSelectedRows(selectedRows);
            handleDeleteRoleModalOpen();
          },
          config: {
            variant: 'contained',
            size: 'small',
            startIcon: <DeleteIcon />,
            label: 'Delete',
          },
          checkDisabled: (selectedRows: RoleModel[]) => {
            //TODO: Check disabled row
            return selectedRows?.length < 1;
          },
        },
      ],
      advanceActions: [
        {
          type: 'button',
          handleClick: (selectedRows: RoleModel[]) => {
            handleCreateRoleModalOpen();
          },
          config: {
            variant: 'contained',
            color: 'primary',
            size: 'small',
            startIcon: <AddIcon />,
            label: 'Create New Role',
          },
        },
        {
          type: 'filter',
          name: 'dbio-filter',
          defaultValue: 'role_id',
          options: [
            {
              label: 'Role ID',
              value: 'role_id',
            },
            {
              label: 'Role Name',
              value: 'role_name',
            },
            {
              label: 'Description',
              value: 'description',
            },
          ],
        },
      ],
    };
  }, []);

  // ------------------------------------------------------------------------------------
  const {
    request,
    isLoading,
    data: roleList,
  } = useApiQuery<ConfigRoleDto[]>({
    endpoint: RoleEndpoint.roleList,
    map: (response) => {
      return response?.dto?.ConfigRoleDto || [];
    },
  });

  const requestGetRoleManagement = () => {
    const payload = { user_id: userInfo.id || '' };
    return request(payload);
  };

  return (
    <Box>
      <CommonTable<ConfigRoleDto>
        fieldAsRowId="role_id"
        columnsConfig={columnsConfig}
        // query={RoleApi.getRoles}

        hasSelectionRows
        onRowClick={handleEditRoleModalOpen}
        filterConfig={filterConfig as unknown as IFilterConfig}
        sortDefault={{
          field: 'description',
          direction: SortDirectionTypes.ASC,
        }}
        ref={tableRef}
        onTriggerRequest={requestGetRoleManagement}
        rows={roleList || []}
        isLoading={isLoading}
      />

      {/* Create Role - Modal */}
      <CreateRoleModal
        visible={isCreateRoleModalVisible}
        handleClose={handleCreateRoleModalClose}
        fetchTableData={tableRef?.current?.fetch}
      />

      {/* Edit Role - Modal */}
      <EditRoleModal
        visible={isEditRoleModalVisible}
        handleClose={handleEditRoleModalClose}
        roleData={selectedRow}
        fetchTableData={tableRef?.current?.fetch}
      />

      {/* Delete Role - Modal */}
      <DeleteRoleModal
        visible={isDeleteRoleModalVisible}
        handleClose={handleDeleteRoleModalClose}
        selectedList={selectedRows}
        fetchTableData={tableRef?.current?.fetch}
      />
    </Box>
  );
});
export default RoleManagementDataTable;
