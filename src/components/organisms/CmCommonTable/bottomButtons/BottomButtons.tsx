import React, { useCallback, useMemo } from 'react';

import { Button, Stack } from '@mui/material';

import { IBottomAction, IPlainObject } from '../types';

const TBottomButton = <TRowDataType extends IPlainObject>({
  label,
  onClick,
  checkDisabled,
  selectedRows,
}: IBottomAction<TRowDataType> & {
  selectedRows: TRowDataType[];
}) => {
  const isDisabled = useMemo<boolean>(() => {
    return checkDisabled(selectedRows);
  }, [checkDisabled, selectedRows]);

  const handleClick = useCallback(() => {
    onClick?.(selectedRows);
  }, [onClick, selectedRows]);

  return (
    <Button
      variant="contained"
      disabled={isDisabled}
      color="primary"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

const BottomButton = React.memo(TBottomButton) as typeof TBottomButton;

const BottomButtons = <TRowDataType extends IPlainObject>({
  actions,
  selectedRows,
}: {
  actions: IBottomAction<TRowDataType>[];
  selectedRows: TRowDataType[];
}) => {
  return (
    <Stack
      spacing={2}
      direction={'row'}
    >
      {actions?.map((action, index) => {
        return (
          <BottomButton
            key={index}
            {...action}
            selectedRows={selectedRows}
          />
        );
      })}
    </Stack>
  );
};

export default React.memo(BottomButtons) as typeof BottomButtons;
