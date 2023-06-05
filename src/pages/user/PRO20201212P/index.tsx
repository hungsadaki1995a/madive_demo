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
import { useMemo, useState } from 'react';

import { Box, Grid, Paper } from '@mui/material';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';
import { ICommonTableColumn, IPlainObject } from '@/components/organisms/CmCommonTable/types';
// Templates
import { CmPageTselectColum } from '@/components/templates/CmPageTitle';

// Icon
import { ReactComponent as ArrLeftIcon } from '@/stylesheets/images/arrLeftIcon.svg';
import { ReactComponent as ArrRightIcon } from '@/stylesheets/images/arrRightIcon.svg';

import { UserStyled } from '../User.Styled';
import DataTable from './DataTable';

const sampleLeftTableRowsData = [
  {
    role_id: 'AdminRole',
    role_name: 'AdminRole',
  },
];

const sampleRightTableRowsData = [
  {
    role_id: 'newAdminRole',
    role_name: 'New Admin Role',
  },
  {
    role_id: 'UserRole',
    role_name: 'UserRole',
  },
];

function GroupRoleAssign() {
  const [sampleLeftTableRows, setSampleLeftTableRows] = useState(sampleLeftTableRowsData);
  const [sampleRightTableRows, setSampleRightTableRows] = useState(sampleRightTableRowsData);
  const [leftTableSelectedRows, setLeftTableSelectedRows] = useState<any[]>([]);
  const [rightTableSelectedRows, setRightTableSelectedRows] = useState<any[]>([]);

  // -----------------------------------
  // Config table

  const leftTableColumnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
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
    ];
  }, []);

  const rightTableColumnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
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
    ];
  }, []);

  const paginationConfig = {
    rowsPerPageOptions: [10, 25, 50, 100],
    currentPage: 0,
    rowsPerPage: 10,
    totalCount: 0,
    rowsPerPagePosition: 'last',
    onPageChange: (newPageIndex: number) => console.log(newPageIndex),
    onRowsPerPageChange: (newRowsPerPage: number) => console.log(newRowsPerPage),
  };

  const onLeftTableSelectedRows = (rows: any) => {
    setLeftTableSelectedRows([...rows]);
  };

  const onRightTableSelectedRows = (rows: any) => {
    setRightTableSelectedRows([...rows]);
  };

  const handleAddRole = () => {
    setSampleLeftTableRows([
      ...sampleLeftTableRows,
      ...rightTableSelectedRows.map((obj) => {
        return {
          role_id: obj.role_id,
          role_name: obj.role_name,
        };
      }),
    ]);

    setSampleRightTableRows(
      sampleRightTableRows.filter(
        (row) => !rightTableSelectedRows.some((selected) => row['role_id'] === selected['role_id'])
      )
    );
  };

  const handleDeleteRole = () => {
    setSampleRightTableRows([
      ...sampleRightTableRows,
      ...leftTableSelectedRows.map((obj) => {
        return {
          role_id: obj.role_id,
          role_name: obj.role_name,
        };
      }),
    ]);

    setSampleLeftTableRows(
      sampleLeftTableRows.filter(
        (row) => !leftTableSelectedRows.some((selected) => row['role_id'] === selected['role_id'])
      )
    );
  };

  return (
    <UserStyled>
      {/* {title} */}
      <CmPageTselectColum />

      <Paper className="transferBox">
        <Grid
          container
          className="transferGrid"
        >
          <Grid item>
            <Box sx={{ width: '100%', height: 260, overflow: 'auto' }}>
              <DataTable
                rows={sampleLeftTableRows}
                columnsConfig={leftTableColumnsConfig}
                fieldAsRowId="role_id"
                paginationConfig={paginationConfig}
                onSelectedRows={onLeftTableSelectedRows}
              />
            </Box>
          </Grid>
          <Grid className="btnCenter">
            <Grid
              container
              direction="column"
              alignItems="center"
            >
              <CmButton
                variant="contained"
                startIcon={<ArrLeftIcon />}
                btnTitle="Add Role"
                onClick={handleAddRole}
              />
              <CmButton
                variant="contained"
                startIcon={<ArrRightIcon />}
                btnTitle="Delete Role"
                onClick={handleDeleteRole}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ width: '100%', height: 260, overflow: 'auto' }}>
              <DataTable
                rows={sampleRightTableRows}
                columnsConfig={rightTableColumnsConfig}
                fieldAsRowId="role_id"
                paginationConfig={paginationConfig}
                onSelectedRows={onRightTableSelectedRows}
              />
            </Box>
          </Grid>
        </Grid>

        <Box className="flexEnd">
          <CmButton
            variant="contained"
            btnTitle="Save"
          />
        </Box>
      </Paper>
    </UserStyled>
  );
}
export default GroupRoleAssign;
