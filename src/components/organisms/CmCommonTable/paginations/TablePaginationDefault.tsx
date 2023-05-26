import { useCallback } from 'react';

import { TablePagination } from '@mui/material';

import { IPaginationConfig } from '../types';

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
