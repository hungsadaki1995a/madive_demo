import { TablePagination } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { rowsPerPageDefault, rowsPerPageOptionsDefault } from '@/utils/const/form';

import { IPaginationConfig } from '../types';

// Styled
const useStyles = makeStyles(({ palette }) => ({
  pagination: {
    borderBottom: 0,
    '& *': {
      fontSize: '12px',
      lineHeight: '16px',
      color: palette.neutralLight[800],
    },
    '& div[class*="MuiTablePagination-select"] svg': {
      width: '18px',
      height: '18px',
      marginTop: '-3px',
      '& path': {
        color: palette.neutralLight[500],
      },
    },
    '& ~ label[class*="makeStyles-button"]': {
      marginLeft: '8px',
    },
  },
}));

const CmTablePagination = ({
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage = rowsPerPageDefault,
  rowsPerPageOptions = rowsPerPageOptionsDefault,
  totalCount,
}: IPaginationConfig) => {
  const handlePageChange = (event: React.MouseEvent | null, newPageIndex: number) => {
    onPageChange?.(newPageIndex);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange?.(Number(event.target.value));
  };
  const classes = useStyles();

  return (
    <TablePagination
      className={classes.pagination}
      rowsPerPageOptions={rowsPerPageOptions}
      rowsPerPage={rowsPerPage}
      count={totalCount}
      page={currentPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default CmTablePagination;
