import React from 'react';

import BottomButtons from '../bottomButtons/BottomButtons';
import FilterControls from '../filterControls/FilterControls';
import TablePaginationDefault from '../paginations/TablePaginationDefault';
import BottomSection from '../styled/BottomSection';
import FilterSection from '../styled/FilterSection';
import HeaderSection from '../styled/HeaderSection';
import TableSection from '../styled/TableSection';
import TableGrid from '../tablePartitions/TableGrid';
import TopButton from '../topButton';
import { IPlainObject, TableLayoutProps } from '../types';

const TableLayoutDefault = <TRowDataType extends IPlainObject>({
  fieldAsRowId,
  showTopSelect,
  topActionConfig,
  addBtnConfig,
  filterConfig,
  onFilterTriggerQuery,
  hasSelectionRows,
  rows,
  columnsConfig,
  handleCheckAll,
  handleSortTable,
  sortInfo,
  handleCheckRow,
  handleRowClick,
  paginationConfig,
  renderPaginationAs,
  selectedRowsMapping,
  selectedRows,
  bottomActionsConfig,
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
      <HeaderSection>
        <div>
          {!!topActionConfig && (
            <TopButton
              topAction={topActionConfig}
              showTopSelect={showTopSelect}
            />
          )}
        </div>
        <FilterSection>
          <FilterControls
            addBtnConfig={addBtnConfig}
            filterConfig={filterConfig}
            onTriggerQuery={(filterData) => {
              onFilterTriggerQuery?.(filterData);
            }}
          />
        </FilterSection>
      </HeaderSection>

      <TableSection>
        <TableGrid
          columnsConfig={columnsConfig}
          fieldAsRowId={fieldAsRowId}
          handleCheckAll={handleCheckAll}
          handleCheckRow={handleCheckRow}
          handleSortTable={handleSortTable}
          hasSelectionRows={hasSelectionRows}
          handleRowClick={handleRowClick}
          rows={rows}
          selectedRows={selectedRows}
          selectedRowsMapping={selectedRowsMapping}
          sortInfo={sortInfo}
        />
      </TableSection>

      <BottomSection>
        {!!bottomActionsConfig && (
          <BottomButtons
            actions={bottomActionsConfig}
            selectedRows={selectedRows}
          />
        )}
        {!!paginationConfig && (
          <PaginationComponent
            rowsPerPageOptions={paginationConfig.rowsPerPageOptions}
            totalCount={paginationConfig.totalCount}
            rowsPerPage={paginationConfig.rowsPerPage}
            currentPage={paginationConfig.currentPage}
            onPageChange={paginationConfig.onPageChange}
            onRowsPerPageChange={paginationConfig.onRowsPerPageChange}
            rowsPerPagePosition={paginationConfig.rowsPerPagePosition}
          />
        )}
      </BottomSection>
    </div>
  );
};

export default React.memo(TableLayoutDefault) as typeof TableLayoutDefault;
