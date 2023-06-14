/******************************************************
 * Program ID : src/pages/user/PRO20201212P.tsx
 * Program Name : Group-Role Assign
 * Create On : 2023.05.31
 * 개 요 : PRO20201212P.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.31   김정아 차장   최초 작성
 ******************************************************/
import { useEffect, useMemo, useState } from 'react';

import { Box, Grid, Paper, SelectChangeEvent } from '@mui/material';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';
import { ICommonTableColumn } from '@/components/organisms/CmCommonTable/types';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

import { RoleApi } from '@/apis';
// Icon
import { ReactComponent as ArrLeftIcon } from '@/stylesheets/images/arrLeftIcon.svg';
import { ReactComponent as ArrRightIcon } from '@/stylesheets/images/arrRightIcon.svg';
import { ConfigGroupDto } from '@/types/dtos/configGroupDto';
import { ConfigRoleDto } from '@/types/dtos/configRoleDtos';
import { formatDropdownData } from '@/utils/formatDropdownData';
import { notify } from '@/utils/notify';

import { UserStyled } from '../User.Styled';
import DataTable from './DataTable';

// -----------------------------------
// Config table

const leftTableColumnsConfig: ICommonTableColumn<ConfigGroupDto>[] = [
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
];

const rightTableColumnsConfig: ICommonTableColumn<ConfigRoleDto>[] = [
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
];

function GroupRoleAssign() {
  //Right Table Data
  const [roleListData, setRoleListData] = useState<ConfigRoleDto[]>([]);

  //Selected group name value
  const [selectedGroupName, setSelectedGroupName] = useState<string>('');

  //Left Table Data
  const [groupRoleData, setGroupRoleData] = useState<ConfigGroupDto[]>([]);

  // Select option data
  const [groupListData, setGroupListData] = useState<ConfigGroupDto[]>([]);

  //groupRoleData data selected
  const [leftTableSelectedRows, setLeftTableSelectedRows] = useState<ConfigGroupDto[]>([]);

  //roleListData data selected
  const [rightTableSelectedRows, setRightTableSelectedRows] = useState<ConfigGroupDto[]>([]);

  //isSubmitting
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const userId = 'admin';

  const handleSelectGroup = (e: SelectChangeEvent<any>) => {
    setSelectedGroupName(e.target.value);
  };

  //handle get role list by user Id
  const getRoleList = async (userId: string) => {
    const data = await RoleApi.RoleListGet();
    if (data?.ConfigRoleDto) {
      setRoleListData(data?.ConfigRoleDto);
    }
  };

  //handle get group list
  const getGroupList = async () => {
    const data = await RoleApi.GroupListGet();
    if (data?.ConfigGroupDto) {
      setGroupListData(data?.ConfigGroupDto);
    }
  };

  //handle get group role by group name
  const getGroupRole = async (group_name: string) => {
    const data = await RoleApi.GroupRoleGet(group_name);
    if (data?.ConfigGroupDto) {
      setGroupRoleData(data?.ConfigGroupDto);
    }
  };

  const onLeftTableSelectedRows = (rows: ConfigGroupDto[]) => {
    setLeftTableSelectedRows(rows);
  };

  const onRightTableSelectedRows = (rows: ConfigGroupDto[]) => {
    setRightTableSelectedRows(rows);
  };

  const handleAddRole = () => {
    setGroupRoleData((prev) => {
      return [...prev, ...rightTableSelectedRows];
    });
  };

  const handleDeleteRole = () => {
    setGroupRoleData((prev) => {
      return prev.filter(
        (item) => leftTableSelectedRows.filter((selectedItem) => selectedItem.role_id === item.role_id).length === 0
      );
    });
  };

  const roleListRenderData = useMemo(() => {
    return roleListData.filter(
      (item) => groupRoleData.filter((groupItem) => groupItem.role_id === item.role_id).length === 0
    );
  }, [roleListData, groupRoleData]);

  const handleSave = async () => {
    setIsSubmitting(true);
    const formatGroupData = groupRoleData.map((item) => {
      return {
        group_name: selectedGroupName,
        role_id: item.role_id,
        role_name: item.role_name,
      };
    });

    const res = await RoleApi.GroupRoleAssign({ newGroupData: formatGroupData, groupName: selectedGroupName });

    if (res?.dto) {
      notify.success('Updating Successful!');
    } else {
      notify.error(res?.data?.exception?.name || 'Something went wrong');
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    getGroupList();
  }, []);

  //get group role when select group name
  useEffect(() => {
    if (selectedGroupName) {
      getGroupRole(selectedGroupName);
    }
  }, [selectedGroupName]);

  //get group role when select group name or user id Changed
  useEffect(() => {
    if (selectedGroupName && userId) {
      getRoleList(userId);
    }
  }, [selectedGroupName, userId]);

  useEffect(() => {
    if (groupListData?.length) {
      setSelectedGroupName(groupListData?.[0]?.group_name);
    }
  }, [groupListData]);

  return (
    <UserStyled>
      {/* {title} */}

      <CmPageTselectColum
        optionsData={formatDropdownData(groupListData, 'group_name', 'group_name')}
        value={selectedGroupName}
        onChange={handleSelectGroup}
        label="Group List"
      />

      <Paper className="transferBox">
        <Grid
          container
          className="transferGrid"
        >
          <Grid item>
            <DataTable
              tableLabel="Included Role List"
              rows={groupRoleData}
              columnsConfig={leftTableColumnsConfig}
              fieldAsRowId="role_id"
              onSelectedRows={onLeftTableSelectedRows}
            />
          </Grid>
          <Grid
            item
            container
            className="btnCenter"
          >
            <Grid
              item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box>
                <CmButton
                  variant="contained"
                  startIcon={<ArrLeftIcon />}
                  btnTitle="Add Role"
                  onClick={handleAddRole}
                  disabled={!rightTableSelectedRows.length}
                />
              </Box>

              <CmButton
                variant="contained"
                startIcon={<ArrRightIcon />}
                btnTitle="Delete Role"
                onClick={handleDeleteRole}
                disabled={!leftTableSelectedRows.length}
              />
            </Grid>
          </Grid>
          <Grid item>
            <DataTable
              tableLabel="Total Role List"
              rows={roleListRenderData}
              columnsConfig={rightTableColumnsConfig}
              fieldAsRowId="role_id"
              onSelectedRows={onRightTableSelectedRows}
            />
          </Grid>
        </Grid>

        <Box className="flexEnd">
          <CmButton
            variant="contained"
            btnTitle="Save"
            onClick={handleSave}
            disabled={isSubmitting}
          />
        </Box>
      </Paper>
    </UserStyled>
  );
}
export default GroupRoleAssign;
