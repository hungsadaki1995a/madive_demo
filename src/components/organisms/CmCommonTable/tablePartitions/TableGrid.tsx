import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import FailIcon from '@/stylesheets/images/FailIcon.svg';
import SuccessIcon from '@/stylesheets/images/SuccessIcon.svg';
import { IPlainObject } from '@/types/common';

import { TableLayoutProps } from '../types';
import BodyCheckBoxCell from './BodyCheckBoxCell';
import HeaderCheckBoxCell from './HeaderCheckBoxCell';
import TableEmpty from './TableEmpty';
import TableHeaderCell from './TableHeaderCell';

const TableHeadComponent = styled(TableHead)(({ theme }) => ({
  '& .MuiTableRow-head': {
    // backgroundColor: '#f4f7fc',
    borderBottom: '2px solid',
    borderColor: theme.palette.neutralLight[200],
    '& .MuiTableCell-head': {
      color: theme.palette.neutralLight[500],
      fontSize: '13px',
      height: '40px',
      padding: '0 8px',
      fontWeight: theme.typography.fontWeightMedium,
      // borderRight: '1px solid #dbdfe1',
      // '&:last-child': {
      //   borderRight: 'none',
      // },
    },
  },
}));

const TableBodyComponent = styled(TableBody)(({ theme }) => ({
  '& .MuiTableRow-root': {
    '&:nth-child(even)': {
      backgroundColor: '#f9fafa',
    },
    '& .MuiTableCell-body': {
      padding: '0 8px',
      fontSize: '12px',
      height: '32px',
      color: theme.palette.neutralLight[800],
      fontWeight: theme.typography.fontWeightRegular,
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
  },
}));

const StyledTableRow = styled(TableRow)(({ hidden = false }: { hidden: boolean }) => ({
  '& .MuiCheckbox-root': {
    visibility: hidden ? 'hidden' : 'visible',
    '&.Mui-checked': {
      visibility: 'visible',
    },
  },
  '&:hover': {
    '& .MuiCheckbox-root': {
      visibility: 'visible',
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
  | 'onRowClick'
  | 'allowMultipleSelect'
>;

const TableGrid = <TRowDataType extends IPlainObject>({
  allowMultipleSelect = true,
  hasSelectionRows,
  rows = [],
  selectedRows,
  handleCheckAll,
  columnsConfig,
  handleSortTable,
  sortInfo,
  selectedRowsMapping,
  handleCheckRow,
  fieldAsRowId,
  onRowClick = undefined,
}: TableGridProps<TRowDataType>) => {
  const handleClickRow = (event: React.MouseEvent, row: TRowDataType) => {
    onRowClick?.(event, row);
  };

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
                disabled={!allowMultipleSelect}
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
                  <StyledTableRow
                    hidden={!allowMultipleSelect}
                    key={`table-body-contents-${idx}`}
                    onClick={(e) => handleClickRow(e, d)}
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
                  </StyledTableRow>
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
