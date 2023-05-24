import { TableRow } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px rgba(0, 0, 0, 0.05) solid',
    width: 'calc(100vw - 328px)',
    minWidth: 1312,
    minHeight: 535,
    backgroundColor: '#fff',
    '& span': {
      color: '#000',
      fontSize: 14,
      fontWeight: 700,
    },
  },
}));

const TableEmpty = () => {
  const classes = useStyles();

  return (
    <TableRow>
      <td className={classes.wrap}>
        <span>No data to display</span>
      </td>
    </TableRow>
  );
};

export default TableEmpty;
