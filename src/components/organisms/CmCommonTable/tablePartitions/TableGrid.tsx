import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { IPlainObject, TableLayoutProps } from '../types';
import BodyCheckBoxCell from './BodyCheckBoxCell';
import HeaderCheckBoxCell from './HeaderCheckBoxCell';
import TableEmpty from './TableEmpty';
import TableHeaderCell from './TableHeaderCell';

const TableHeadComponent = styled(TableHead)(({ theme }) => ({
  '& .MuiTableRow-head': {
    backgroundColor: '#f4f7fc',
    '& .MuiTableCell-head': {
      color: '#444',
      fontSize: '13px',
      height: '34px',
      padding: '0 15px',
      fontWeight: theme.typography.fontWeightMedium,
      borderRight: '1px solid #dbdfe1',
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
}));
const TableBodyComponent = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '&:nth-child(even)': {
      backgroundColor: '#f9fafa',
    },
    '& .MuiTableCell-body': {
      padding: '5px 15px',
      fontSize: '12px',
      color: '#888888',
    },
    '&:hover': {
      '& .MuiTableCell-body': {
        backgroundColor: '#e6f4ff',
        color: '#30404d',
        fontSize: '13px',
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
}));

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
        <TableHeadComponent>
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
        </TableHeadComponent>
        <TableBodyComponent>
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
        </TableBodyComponent>
      </Table>
    </TableContainer>
  );
};

export default TableGrid;
