/******************************************************
 * Program ID : src/pages/user/PRO20201211P.tsx
 * Program Name : User-Group Assign
 * Create On : 2023.05.31
 * 개 요 : PRO20201211P.tsx
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
    user_id: 'lukeadmin',
    is_default: 'N',
    is_admin: 'N',
  },
  {
    user_id: 'lukesnb',
    is_default: 'N',
    is_admin: 'Y',
  },
];

const sampleRightTableRowsData = [
  {
    user_id: '00_12',
  },
  {
    user_id: '00_aa',
  },
  {
    user_id: '00_ad',
  },
];

function UserGroupAssign() {
  const [sampleLeftTableRows, setSampleLeftTableRows] = useState(sampleLeftTableRowsData);
  const [sampleRightTableRows, setSampleRightTableRows] = useState(sampleRightTableRowsData);
  const [leftTableSelectedRows, setLeftTableSelectedRows] = useState<any[]>([]);
  const [rightTableSelectedRows, setRightTableSelectedRows] = useState<any[]>([]);

  // -----------------------------------
  // Config table

  const leftTableColumnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'user_id',
        label: 'User ID',
        type: 'text',
        sortable: true,
      },
      {
        field: 'is_default',
        label: 'Default',
        type: 'text',
        sortable: true,
      },
      {
        field: 'is_admin',
        label: 'Admin',
        type: 'text',
        sortable: true,
      },
    ];
  }, []);

  const rightTableColumnsConfig = useMemo<ICommonTableColumn<IPlainObject>[]>(() => {
    return [
      {
        field: 'user_id',
        label: 'user_id',
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

  const handleAddUser = () => {
    setSampleLeftTableRows([
      ...sampleLeftTableRows,
      ...rightTableSelectedRows.map((obj) => {
        return {
          user_id: obj.user_id,
          is_default: 'N',
          is_admin: 'N',
        };
      }),
    ]);

    setSampleRightTableRows(
      sampleRightTableRows.filter(
        (row) => !rightTableSelectedRows.some((selected) => row['user_id'] === selected['user_id'])
      )
    );
  };

  const handleDeleteUser = () => {
    setSampleRightTableRows([
      ...sampleRightTableRows,
      ...leftTableSelectedRows.map((obj) => {
        return {
          user_id: obj.user_id,
        };
      }),
    ]);

    setSampleLeftTableRows(
      sampleLeftTableRows.filter(
        (row) => !leftTableSelectedRows.some((selected) => row['user_id'] === selected['user_id'])
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
                fieldAsRowId="user_id"
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
                btnTitle="Add User"
                onClick={handleAddUser}
              />
              <CmButton
                variant="contained"
                startIcon={<ArrRightIcon />}
                btnTitle="Delete User"
                onClick={handleDeleteUser}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ width: '100%', height: 260, overflow: 'auto' }}>
              <DataTable
                rows={sampleRightTableRows}
                columnsConfig={rightTableColumnsConfig}
                fieldAsRowId="user_id"
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
export default UserGroupAssign;