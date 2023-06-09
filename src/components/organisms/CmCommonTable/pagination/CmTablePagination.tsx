import { TablePagination } from '@mui/material';

import { rowsPerPageDefault, rowsPerPageOptionsDefault } from '@/utils/const/form.const';

import { IPaginationConfig } from '../types';

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

  return (
    <TablePagination
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
