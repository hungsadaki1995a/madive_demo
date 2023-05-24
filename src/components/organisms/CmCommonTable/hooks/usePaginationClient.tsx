import { useMemo } from 'react';

const usePaginationClient = ({
  derivedRows,
  rowsPerPage,
  currentPage,
}: {
  derivedRows: any[];
  rowsPerPage: number;
  currentPage: number;
}) => {
  const pagingRows = useMemo(() => {
    const offset = currentPage * rowsPerPage;
    return derivedRows.slice(offset, offset + rowsPerPage);
  }, [rowsPerPage, currentPage, derivedRows]);

  return {
    pagingRows,
  };
};

export default usePaginationClient;
