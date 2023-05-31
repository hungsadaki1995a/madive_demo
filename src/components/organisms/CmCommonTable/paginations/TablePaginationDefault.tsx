import { useEffect, useState } from 'react';

import { FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';
import { IconButton, MenuItem, Select, SelectChangeEvent, Stack, styled, TextField, Typography } from '@mui/material';

import { IPaginationConfig } from '../types';

const IconButtonComponent = styled(IconButton)`
  cursor: pointer;
  &.Mui-disabled {
    cursor: not-allowed;
    pointer-events: auto;
  }
`;

const InputPageNumberComponent = styled(TextField)`
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    display: none;
  }
  input {
    height: 26px;
    width: 46px;
    padding: 0;
    margin: 0;
    font-size: 12px;
    text-align: center;
  }
`;

const RowsPerPageDropdown = styled(Select)`
  .MuiSelect-select {
    height: 26px;
    padding: 0 10px;
    text-align: center;
    font-size: 12px;
    vertical-align: middle;
    line-height: 26px;
  }
`;

const TablePaginationDefault = ({
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage,
  rowsPerPageOptions,
  totalCount,
  rowsPerPagePosition,
}: IPaginationConfig) => {
  const maxPage = Math.ceil(totalCount / rowsPerPage);
  const [pageNumber, setPageNumber] = useState<string | number>(0);

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

  const handleKeyDownCurrentPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNumber = Number((e.target as HTMLInputElement).value);
      handleChangeCurrentPage(pageNumber);
    }
  };

  const handleBlurCurrentPage = (e: React.FocusEvent<HTMLInputElement>) => {
    const pageNumber = Number(e.target.value);
    handleChangeCurrentPage(pageNumber);
  };

  const handleChangeCurrentPage = (pageNumber: number) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (pageNumber > maxPage) {
      pageNumber = maxPage;
    }
    setPageNumber(pageNumber);
    onPageChange?.(pageNumber - 1);
  };

  useEffect(() => {
    //TODO: Rerender multiple time
    setPageNumber(currentPage + 1);
  }, [currentPage]);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={3}
    >
      {rowsPerPagePosition === 'first' ? (
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
      ) : (
        <Typography variant="body1">
          <Typography
            color="info.main"
            margin={1}
          >
            {totalCount}
          </Typography>
          <span>Results</span>
        </Typography>
      )}

      <Stack
        direction="row"
        alignItems="center"
      >
        <IconButtonComponent
          size="small"
          sx={{ padding: 0 }}
          onClick={handleFirst}
          disabled={currentPage <= 0}
        >
          <FirstPage />
        </IconButtonComponent>
        <IconButtonComponent
          size="small"
          sx={{ padding: 0, marginRight: '10px' }}
          onClick={handlePrevious}
          disabled={currentPage <= 0}
        >
          <NavigateBefore />
        </IconButtonComponent>
        <InputPageNumberComponent
          type="number"
          value={pageNumber}
          onChange={(e) => setPageNumber(e.target.value)}
          onKeyDown={handleKeyDownCurrentPage}
          onBlur={handleBlurCurrentPage}
        />
        <Typography variant="body1">&nbsp; of {maxPage} </Typography>
        <IconButtonComponent
          size="small"
          sx={{ padding: 0, marginLeft: '10px' }}
          onClick={handleNext}
          disabled={currentPage >= maxPage - 1}
        >
          <NavigateNext />
        </IconButtonComponent>
        <IconButtonComponent
          size="small"
          sx={{ padding: 0 }}
          onClick={handleLast}
          disabled={currentPage >= maxPage - 1}
        >
          <LastPage />
        </IconButtonComponent>
      </Stack>
      {rowsPerPagePosition === 'last' ? (
        <RowsPerPageDropdown
          size="small"
          defaultValue={String(rowsPerPage)}
          onChange={(event: SelectChangeEvent<unknown>) => {
            onRowsPerPageChange?.(Number(event.target.value));
          }}
          style={{ padding: 0 }}
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
        </RowsPerPageDropdown>
      ) : (
        <Typography variant="body1">
          <Typography color="info.main">{totalCount} </Typography>
          <span>Results</span>
        </Typography>
      )}
    </Stack>
  );
};

export default TablePaginationDefault;
