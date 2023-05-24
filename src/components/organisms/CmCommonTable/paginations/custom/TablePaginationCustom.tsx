import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import NavigateBefore from '@mui/icons-material/NavigateBefore';
import NavigateNext from '@mui/icons-material/NavigateNext';
import { IPaginationConfig } from '../../types';

import { IconButton, MenuItem, Select, SelectChangeEvent, TableCell } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  alignFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
  },
  button: {
    cursor: 'pointer',
  },
}));

const TablePaginationCustom = ({
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage,
  rowsPerPageOptions,
  totalCount,
}: IPaginationConfig) => {
  const classes = useStyles();
  const maxPage = Math.ceil(totalCount / rowsPerPage);

  const handleNext = () => {
    if (currentPage < maxPage - 1) onPageChange?.(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange?.(currentPage - 1);
    }
  };

  const handleFirst = () => {
    if (currentPage > 0) {
      onPageChange?.(0);
    }
  };

  const handleLast = () => {
    if (currentPage < maxPage - 1) {
      onPageChange?.(maxPage - 1);
    }
  };
  return (
    <TableCell>
      <div className={classes.alignFlex}>
        <span className={classes.alignFlex}>{totalCount} Result</span>
        <IconButton
          onClick={handleFirst}
          disabled={currentPage <= 0}
          className={`${classes.alignFlex} ${classes.button}`}
        >
          <FirstPage />
        </IconButton>
        <IconButton
          onClick={handlePrevious}
          disabled={currentPage <= 0}
          className={`${classes.alignFlex} ${classes.button}`}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={currentPage >= maxPage - 1}
          className={`${classes.alignFlex} ${classes.button}`}
        >
          <NavigateNext />
        </IconButton>
        <IconButton
          onClick={handleLast}
          disabled={currentPage >= maxPage - 1}
          className={`${classes.alignFlex} ${classes.button}`}
        >
          <LastPage />
        </IconButton>
        <span className={classes.alignFlex}>
          <Select
            size="small"
            defaultValue={rowsPerPageOptions[0].toString()}
            onChange={(event: SelectChangeEvent) => {
              onRowsPerPageChange?.(parseInt(event.target.value, 10));
            }}
          >
            {rowsPerPageOptions.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              );
            })}
            <MenuItem />
          </Select>
        </span>
      </div>
    </TableCell>
  );
};

export default TablePaginationCustom;
