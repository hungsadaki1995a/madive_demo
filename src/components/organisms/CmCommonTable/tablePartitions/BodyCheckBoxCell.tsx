import React, { useCallback } from 'react';

import { TableCell } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';

interface IBodyCheckBoxCellProps {
  checked: boolean;
  row: any;
  onChange: ({ row, checked }: { row: any; checked: boolean }) => void;
}
const BodyCheckBoxCell = ({ onChange, row, checked, ...props }: IBodyCheckBoxCellProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({
        row,
        checked: e.target.checked,
      });
    },
    [onChange, row]
  );

  return (
    <TableCell
      key={'table-body-contents-selection'}
      className="checkbox-cell"
    >
      <CheckBox
        checked={checked}
        color="info"
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        {...props}
      />
    </TableCell>
  );
};

export default React.memo(BodyCheckBoxCell);
