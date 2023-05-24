import { ITopAction } from '../types';
import React from 'react';
import { Button } from '@mui/material';

import * as CmStyle from '@/stylesheets/common';
import makeStyles from '@mui/styles/makeStyles';
import { notoSansDJKFont } from '@/stylesheets/common';

const useStyles = makeStyles(() => ({
  button: {
    cursor: 'pointer',
    fontFamily: CmStyle.notoSansDJKFont.light,
    // fontFamily: notoSansDJKFont.light,
    fontSize: '13px',
    lineHeight: '20px',
    minWidth: '20px',
    minHeight: '28px',
    padding: '2.5px 8px',
    color: CmStyle.color.colorT01,
    background: CmStyle.color.colorBtnSecondaryBg01,
    '&:hover': {
      background: CmStyle.color.colorBtnSecondaryBg02,
    },
    '&:active': {
      background: CmStyle.color.colorBtnSecondaryBg03,
    },
  },
}));

const TopButton = ({ topAction }: { topAction: ITopAction }) => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        onClick={topAction.onClick}
        variant="text"
        startIcon={topAction.icon ?? null}
      >
        {topAction.label}
      </Button>
    </>
  );
};

export default React.memo(TopButton);
