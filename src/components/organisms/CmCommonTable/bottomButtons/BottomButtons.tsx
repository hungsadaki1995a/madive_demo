import React, { useCallback, useMemo } from 'react';

import { Button, Stack } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { OverridableStringUnion } from '@mui/types';

import { notoSansDJKFont } from '@/stylesheets/common';

import { IBottomAction, IPlainObject } from '../types';

// Styled
const useStyles = makeStyles(() => ({
  button: {
    fontFamily: notoSansDJKFont.regular,
    fontSize: '13px',
    lineHeight: '1.5',
    padding: '2.5px 8px',
    alignItems: 'center',
    minWidth: '20px',
    minHeight: '28px',
    textTransform: 'none',
    boxShadow: 'none',
    '& *': {
      fontFamily: notoSansDJKFont.regular,
      fontSize: '13px',
      lineHeight: '1.5',
    },
    '&:hover': {
      boxShadow: 'none',
    },

    '& .MuiButton-startIcon': {
      margin: 0,
      padding: '2.5px 0 2px 0',
      '& svg': {
        fontSize: '18px',
        '& path': {
          width: '15px',
          height: '15px',
        },
      },
    },
    '& span:not([class*="Mui"])': {
      padding: '0 4px',
      font: ' 13px / 1.5 notoSansDJKFont.light',
    },

    // Primary - Filled
    '&.MuiButton-containedPrimary:not([class*="-disabled"])': {
      color: '#fff',
      background: '#1898F5',

      '&:hover': {
        background: '#0485E3',
      },
      '&:active': {
        background: '#116CAE',
      },
    },
    '&.MuiButton-containedPrimary.Mui-disabled': {
      color: '#B9BDC3',
      background: '#F5F6F7',
      '&:hover': {
        background: 'none',
      },
    },

    // Text - Ghost (No Background)
    '&.MuiButton-textPrimary:not([class*="-disabled"])': {
      color: '#1C293E',
      '&:hover': {
        background: '#ECEEF0',
      },
    },
    '&.MuiButton-textPrimary.Mui-disabled': {
      color: '#B9BDC3',
      '&:hover': {
        background: 'none',
      },
    },

    // String - Ghost (Background)
    '&.tBtnBg:not([class*="-disabled"])': {
      color: '#1C293E',
      background: '#ECEEF0',

      '&:hover': {
        background: '#DEDFE2',
      },
      '&:active': {
        background: '#D3D5DA',
      },
    },
    '&.tBtnBg.Mui-disabled': {
      color: '#B9BDC3',
      background: '#F5F6F7',
    },

    // Outline - Login button
    '&.MuiButton-outlinedPrimary:not([class*="-disabled"])': {
      color: '#fff',
      background: '#434D5F',
      padding: '5px 8px',
      border: 0,
      '.MuiButton-startIcon svg': {
        width: '15px',
        height: '15px',
      },
      '&:hover': {
        background: '#323A48',
      },
      '&:active': {
        background: '#1F2021',
      },
    },
    '&.MuiButton-outlinedPrimary.Mui-disabled': {
      color: '#9EA4AC',
      background: '#5B6576',
      padding: '5px 8px',
      border: 0,
      '& .MuiButton-startIcon svg': {
        width: '15px',
        height: '15px',
      },
      '&:hover': {
        background: 'none',
      },
    },

    // Error
    '&.MuiButton-containedError': {
      background: '#D93E2E',
    },
    '& ~ .MuiButtonBase-root': {
      marginLeft: '10px',
    },
  },

  // IconButton
  '.MuiIconButton-root': {
    minWidth: 'unset',
    padding: '2px',
    marginLeft: '3px',
    '&:hover, &:active': {
      background: 'none',
      '& svg path': {
        transition: 'fill 250ms',
        fill: '#000',
      },
    },
  },
}));

type btnPropsType = {
  id?: string;
  startIcon?: React.ReactNode;
  onClick?: () => void;
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained'>;
  btnTitle?: string;
  className?: string;
  color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'>;
  disabled?: boolean;
};

const TBottomButton = <TRowDataType extends IPlainObject>({
  label,
  onClick,
  checkDisabled,
  selectedRows,
}: IBottomAction<TRowDataType> & {
  selectedRows: TRowDataType[];
}) => {
  const classes = useStyles();
  const isDisabled = useMemo<boolean>(() => {
    return checkDisabled(selectedRows);
  }, [checkDisabled, selectedRows]);

  const handleClick = useCallback(() => {
    onClick?.(selectedRows);
  }, [onClick, selectedRows]);

  return (
    <Button
      className={classes.button}
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
