import { useCallback } from 'react';

import { TablePagination } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import { IPaginationConfig } from '../types';

// Styled
const useStyles = makeStyles(() => ({
  tPagination: {
    marginTop: '12px',
    '& .MuiToolbar-root': {
      minHeight: 'unset',
    },
    '& .MuiToolbar-root *': {
      fontSize: '12px',
      color: '#1C293E',
      fontFamily: 'NotoSansCJKRegular',
    },
    '& p': {
      marginTop: '0',
      marginBottom: '0',
    },
  },
}));

const TablePaginationDefault = ({
  totalCount,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [3, 5, 10, 20],
}: IPaginationConfig & {
  rowsPerPageOptions?: number[];
}) => {
  const classes = useStyles();
  const handlePageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPageIndex: number) => {
      onPageChange?.(newPageIndex);
    },
    []
  );

  const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onRowsPerPageChange?.(parseInt(event.target.value, 10));
  }, []);

  return (
    <TablePagination
      className={classes.tPagination}
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  );
};

export default TablePaginationDefault;
