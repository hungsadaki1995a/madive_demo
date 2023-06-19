import React from 'react';

import { Box } from '@mui/material';

import { IPlainObject } from '@/types/common';

import FilterPanel from '../filterControls/FilterPanel';
import TablePaginationDefault from '../pagination/CmTablePagination';
import TableGrid from '../tablePartitions/TableGrid';
import { TableLayoutProps } from '../types';

const TableLayoutDefault = <TRowDataType extends IPlainObject>({
  fieldAsRowId,
  filterConfig,
  hasSelectionRows,
  rows = [],
  columnsConfig,
  handleCheckAll,
  handleSortTable,
  sortInfo,
  handleCheckRow,
  selectedRowsMapping,
  selectedRows,
  dispatch,
  tableState,
  onChangePage,
  onChangePageSize,
  onChangeFilterClient,
  onChangeFilterServer,
  totalCount,
  onRowClick,
  allowMultipleSelect,
}: TableLayoutProps<TRowDataType>) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        paddingBottom: '1rem',
      }}
    >
      {filterConfig && (
        <FilterPanel
          filterConfig={filterConfig}
          onChangeFilterClient={onChangeFilterClient}
          onChangeFilterServer={onChangeFilterServer}
          selectedRows={selectedRows}
          dispatch={dispatch}
          filterState={tableState.filter}
        />
      )}

      <Box marginTop="1rem">
        <TableGrid
          columnsConfig={columnsConfig}
          fieldAsRowId={fieldAsRowId}
          handleCheckAll={handleCheckAll}
          handleCheckRow={handleCheckRow}
          handleSortTable={handleSortTable}
          hasSelectionRows={hasSelectionRows}
          rows={rows}
          selectedRows={selectedRows}
          selectedRowsMapping={selectedRowsMapping}
          sortInfo={sortInfo}
          onRowClick={onRowClick}
          allowMultipleSelect={allowMultipleSelect}
        />
      </Box>

      {rows.length > 0 && (
        <TablePaginationDefault
          totalCount={totalCount || 0}
          currentPage={tableState.currentPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangePageSize}
          rowsPerPage={tableState.pageSize}
        />
      )}
    </div>
  );
};

export default React.memo(TableLayoutDefault) as typeof TableLayoutDefault;
