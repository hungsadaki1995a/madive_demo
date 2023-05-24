import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { IPlainObject, TableLayoutProps } from '../types';
import BodyCheckBoxCell from './BodyCheckBoxCell';
import HeaderCheckBoxCell from './HeaderCheckBoxCell';
import TableHeaderCell from './TableHeaderCell';
import TableEmpty from './TableEmpty';

type TableGridProps<TRowDataType extends IPlainObject> = Pick<
  TableLayoutProps<TRowDataType>,
  | 'hasSelectionRows'
  | 'rows'
  | 'selectedRows'
  | 'handleCheckAll'
  | 'columnsConfig'
  | 'handleSortTable'
  | 'sortInfo'
  | 'selectedRowsMapping'
  | 'handleCheckRow'
  | 'fieldAsRowId'
>;

const TableGrid = <TRowDataType extends IPlainObject>({
  hasSelectionRows,
  rows,
  selectedRows,
  handleCheckAll,
  columnsConfig,
  handleSortTable,
  sortInfo,
  selectedRowsMapping,
  handleCheckRow,
  fieldAsRowId,
}: TableGridProps<TRowDataType>) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {hasSelectionRows && (
              <HeaderCheckBoxCell
                rowsCount={rows.length}
                selectedRowsCount={selectedRows.length}
                onChange={(e) => {
                  handleCheckAll({
                    checked: e.target.checked,
                  });
                }}
              />
            )}

            {columnsConfig.map((column, idx) => {
              return (
                <TableHeaderCell
                  key={`table-head-row-${idx}`}
                  column={column}
                  onSortClick={handleSortTable}
                  sortInfo={sortInfo}
                />
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableEmpty />
          ) : (
            <>
              {rows.map((d, idx) => {
                return (
                  <TableRow key={`table-body-contents-${idx}`}>
                    {hasSelectionRows && (
                      <BodyCheckBoxCell
                        key={'table-body-contents-selection'}
                        row={d}
                        checked={!!selectedRowsMapping[d[fieldAsRowId]]}
                        onChange={handleCheckRow}
                      />
                    )}
                    {columnsConfig.map((column, jdx) => {
                      return (
                        <TableCell key={`table-body-contents-${idx}-${jdx}`}>
                          {column?.valueRenderAs ? column.valueRenderAs(d) : d[column.field]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableGrid;
