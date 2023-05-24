import { TableCell, styled } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';
import React from 'react';
import { ChangeEvent } from 'react';

const StyledTableCell = styled(TableCell)`
  width: 24px;
`;

interface IHeaderCheckBoxCellProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsCount: number;
  selectedRowsCount: number;
}

const HeaderCheckBoxCell = ({ rowsCount, selectedRowsCount, onChange }: IHeaderCheckBoxCellProps) => {
  return (
    <StyledTableCell>
      <CheckBox
        color="info"
        checked={!!rowsCount && rowsCount === selectedRowsCount}
        onChange={onChange}
      />
    </StyledTableCell>
  );
};

export default React.memo(HeaderCheckBoxCell);
