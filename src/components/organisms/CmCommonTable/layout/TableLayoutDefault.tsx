import React from 'react';

import { Box } from '@mui/material';

import BottomButtons from '../bottomButtons/BottomButtons';
import FilterPanel from '../filterControls/FilterPanel';
import TablePaginationDefault from '../pagination/CmTablePagination';
import BottomSection from '../styled/BottomSection';
import TableGrid from '../tablePartitions/TableGrid';
import { IPlainObject, TableLayoutProps } from '../types';

const TableLayoutDefault = <TRowDataType extends IPlainObject>({
  fieldAsRowId,
  topActionConfig,
  filterConfig,
  onFilterTriggerQuery,
  hasSelectionRows,
  rows = [],
  columnsConfig,
  handleCheckAll,
  handleSortTable,
  sortInfo,
  handleCheckRow,
  paginationConfig,
  renderPaginationAs,
  selectedRowsMapping,
  selectedRows,
  bottomActionsConfig,
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
  const PaginationComponent = renderPaginationAs ? renderPaginationAs : TablePaginationDefault;

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
        <PaginationComponent
          totalCount={totalCount || 0}
          currentPage={tableState.currentPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangePageSize}
          rowsPerPage={tableState.pageSize}
        />
      )}

      {!!bottomActionsConfig && (
        <BottomSection>
          <BottomButtons
            actions={bottomActionsConfig}
            selectedRows={selectedRows}
          />
        </BottomSection>
      )}
    </div>
  );
};

export default React.memo(TableLayoutDefault) as typeof TableLayoutDefault;
