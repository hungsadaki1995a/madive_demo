import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import FailIcon from '@/stylesheets/images/FailIcon.svg';
import SuccessIcon from '@/stylesheets/images/SuccessIcon.svg';

import { IPlainObject, TableLayoutProps } from '../types';
import BodyCheckBoxCell from './BodyCheckBoxCell';
import BodyTableRow from './BodyTableRow';
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
      // ellipsis
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      // Fail, Error
      '&.error': {
        color: '#D93E2E',
        paddingLeft: '20px',
        backgroundImage: `url(${FailIcon}) left center no-repeat`,
      },
      // Success
      '&.success': {
        color: '#30BE8B',
        paddingLeft: '20px',
        backgroundImage: `url(${SuccessIcon}) left center no-repeat`,
      },
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
  | 'handleRowClick'
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
  handleRowClick,
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
                  <BodyTableRow
                    key={`table-body-contents-${idx}`}
                    row={d}
                    onClick={handleRowClick}
                  >
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
                  </BodyTableRow>
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
