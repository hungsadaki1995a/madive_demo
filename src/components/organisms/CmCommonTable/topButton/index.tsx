import { ITopAction } from '../types';
import React from 'react';
import { Button } from '@mui/material';

const TopButton = ({ topAction }: { topAction: ITopAction }) => {
  return (
    <Button
      onClick={topAction.onClick}
      variant="outlined"
      startIcon={topAction.icon ?? null}
    >
      {topAction.label}
    </Button>
  );
};

export default React.memo(TopButton);
