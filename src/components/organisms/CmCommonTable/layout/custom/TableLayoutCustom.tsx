import React from 'react';
import BottomButtons from '../../bottomButtons/BottomButtons';
import FilterControls from '../../filterControls/FilterControls';
import TablePaginationDefault from '../../paginations/TablePaginationDefault';
import BottomSection from '../../styled/BottomSection';
import FilterSection from '../../styled/FilterSection';
import HeaderSection from '../../styled/HeaderSection';
import TableSection from '../../styled/TableSection';
import TableGrid from '../../tablePartitions/TableGrid';
import TopButton from '../../topButton';
import { IPlainObject, TableLayoutProps } from '../../types';

const TableLayoutCustom = <TRowDataType extends IPlainObject>({
  fieldAsRowId,
  topActionConfig,
  filterConfig,
  onFilterTriggerQuery,
  hasSelectionRows,
  rows,
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
        {!!topActionConfig && <TopButton topAction={topActionConfig} />}
        <FilterSection>
          {filterConfig && (
            <FilterControls
              filterConfig={filterConfig}
              onTriggerQuery={(filterData) => {
                onFilterTriggerQuery?.(filterData);
              }}
            />
          )}
        </FilterSection>
        {!!paginationConfig && (
          <PaginationComponent
            rowsPerPageOptions={paginationConfig.rowsPerPageOptions}
            totalCount={paginationConfig.totalCount}
            rowsPerPage={paginationConfig.rowsPerPage}
            currentPage={paginationConfig.currentPage}
            onPageChange={paginationConfig.onPageChange}
            onRowsPerPageChange={paginationConfig.onRowsPerPageChange}
          />
        )}
      </HeaderSection>

      <TableSection>
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
        />
      </TableSection>

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

export default React.memo(TableLayoutCustom) as typeof TableLayoutCustom;
