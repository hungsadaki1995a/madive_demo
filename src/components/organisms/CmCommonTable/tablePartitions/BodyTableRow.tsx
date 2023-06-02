import React, { useCallback } from 'react';

import { TableRow } from '@mui/material';

interface IBodyCheckBoxCellProps {
  children?: React.ReactNode;
  key: string;
  row?: any;
  onClick?: ({ event, row }: { event: React.MouseEvent<unknown>; row: any }) => void;
}
const BodyTableRow = ({ children, key, row, onClick }: IBodyCheckBoxCellProps) => {
  const handleRowClick = useCallback(
    (event: React.MouseEvent<unknown>) => {
      onClick?.({
        event,
        row,
      });
    },
    [onClick, row]
  );

  return (
    <TableRow
      key={key}
      onClick={(event) => handleRowClick(event)}
    >
      {children}
    </TableRow>
  );
};

export default React.memo(BodyTableRow);
