import React, { ChangeEvent } from 'react';

import { styled, TableCell } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';

const StyledTableCell = styled(TableCell)(() => ({
  width: '24px',
}));

const StyledCheckBoxWrapper = styled('div')(() => ({
  display: 'flex',
  maxWidth: '50px',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface IHeaderCheckBoxCellProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  rowsCount: number;
  selectedRowsCount: number;
  disabled?: boolean;
}

const HeaderCheckBoxCell = ({ rowsCount, selectedRowsCount, onChange, ...props }: IHeaderCheckBoxCellProps) => {
  return (
    <StyledTableCell>
      <StyledCheckBoxWrapper>
        <CheckBox
          color="info"
          checked={!!rowsCount && rowsCount === selectedRowsCount}
          onChange={onChange}
          {...props}
        />
      </StyledCheckBoxWrapper>
    </StyledTableCell>
  );
};

export default React.memo(HeaderCheckBoxCell);
