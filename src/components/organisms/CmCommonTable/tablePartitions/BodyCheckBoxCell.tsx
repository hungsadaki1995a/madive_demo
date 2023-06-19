import React, { useCallback } from 'react';

import { TableCell } from '@mui/material';
import CheckBox from '@mui/material/Checkbox';
import makeStyles from '@mui/styles/makeStyles';

// Styled
const useStyles = makeStyles(({ palette }) => ({
  checkbox: {
    '& .MuiCheckbox-colorInfo': {
      padding: 0,
      '& path': {
        fill: palette.neutralLight[400],
      },
    },
    // borderBottom: 0,
    // '& *': {
    //   fontSize: '12px',
    //   lineHeight: '16px',
    //   color: palette.neutralLight[800],
    // },
    // '& div[class*="MuiTablePagination-select"] svg': {
    //   width: '18px',
    //   height: '18px',
    //   marginTop: '-3px',
    //   '& path': {
    //     color: palette.neutralLight[500],
    //   },
    // },
  },
}));

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
  const classes = useStyles();

  return (
    <TableCell
      key={'table-body-contents-selection'}
      // className="checkbox-cell"
      className={classes.checkbox}
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
