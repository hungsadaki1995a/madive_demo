/******************************************************
 * Program ID : src/componetnts/atoms/CmButton.js
 * Program Name : 공통 버튼 영역 컴포넌트
 * Create On : 2023.05.12
 * 개 요 : 공통 버튼 영역 컴포넌트
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.12   김정아 차장   최초 작성
 ******************************************************/
// import * as CmStyle from '@/stylesheets/common';
import React from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { OverridableStringUnion } from '@mui/types';

import { IButtonMenuConfig } from '../organisms/CmCommonTable/types';
import { CmButtonStyle } from './Atoms.Styled';

// Styled
const useStyles = makeStyles(({ palette, typography }) => ({
  button: {
    '& ~ label[class*="makeStyles-button"]': {
      marginLeft: '8px',
    },
    '& button': {
      fontWeight: typography.fontWeightRegular,
      fontSize: '13px',
      lineHeight: '1.5',
      padding: '2.5px 8px',
      alignItems: 'center',
      minWidth: '20px',
      minHeight: '28px',
      textTransform: 'none',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },

      '& .MuiButton-startIcon': {
        margin: 0,
        '& svg': {
          margin: '0 4px 0 1px',
          padding: '2.5px 0 2px 0',
          fontSize: '18px',
          height: '18px',
          '& path': {
            width: '15px',
            height: '15px',
          },
        },
      },
      '& span:not([class*="Mui"])': {
        padding: '0 4px',
        fontSize: '13px',
      },

      // Primary - Filled
      '&.MuiButton-containedPrimary:not([class*="-disabled"])': {
        color: '#fff',
        background: palette.blue[500],
        '& svg path': {
          fill: '#fff',
        },

        '&:hover': {
          background: palette.blue[600],
        },
        '&:active': {
          background: palette.blue[700],
        },
      },
      '&.MuiButton-containedPrimary.Mui-disabled': {
        color: palette.neutralLight[300],
        background: palette.neutralLight[50],
        '& svg path': {
          fill: palette.neutralLight[300],
        },
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
      '&.MuiButton-textPrimary.Mui-disabled:not([class*="tBtnBg"])': {
        color: palette.grey[200],
        '&:hover': {
          background: 'none',
        },
      },

      // String - Ghost (Background)
      '&:not([class*="-disabled"]).tBtnBg': {
        color: '#1C293E',
        background: '#DEDFE2',
        '& svg path': {
          fill: '#1C293E',
        },
        '&:hover': {
          background: '#DEDFE2',
        },
        '&:active': {
          background: '#D3D5DA',
        },
      },
      '&.tBtnBg.MuiButton-textPrimary.Mui-disabled': {
        color: palette.grey[200],
        background: palette.grey[50],
        '& svg path': {
          fill: palette.grey[200],
        },
      },

      // Outline - Login button
      '&.MuiButton-outlinedPrimary:not([class*="-disabled"])': {
        color: '#fff',
        background: '#434D5F',
        padding: '2.5px 8px',
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
  // color?: OverridableStringUnion<'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'>;
  color?: OverridableStringUnion<'error'>;
  disabled?: boolean;
  type?: OverridableStringUnion<'button' | 'reset' | 'submit'>;
};

function CmButton(props: btnPropsType) {
  const classes = useStyles();
  const { id, startIcon, className, onClick, variant, color, btnTitle, disabled, type = 'button' } = props;

  // === variant===
  // 'contained' - bule
  // 'string' - contents
  // 'outlined' - 'logout'
  // 'text'

  return (
    <label className={classes.button}>
      <Button
        id={id}
        startIcon={startIcon}
        className={className}
        type={type}
        variant={variant}
        onClick={onClick}
        color={color}
        disabled={disabled}
      >
        {btnTitle ? <span>{btnTitle}</span> : null}
      </Button>
    </label>
  );
}

type icoBtnPropsType = {
  iconName: React.ReactNode;
  onClick?: () => void;
  btnTitle?: string;
  disabled?: boolean;
  size?: OverridableStringUnion<'small' | 'medium' | 'large'>;
};

function CmIconButton(props: icoBtnPropsType) {
  const { btnTitle, iconName, onClick, disabled } = props;

  return (
    <CmButtonStyle>
      <Tooltip
        title={btnTitle}
        arrow
      >
        <IconButton
          onClick={onClick}
          size="small"
          disabled={disabled}
          // className="iconBtn"
          // type="file"
        >
          {iconName}
        </IconButton>
      </Tooltip>
    </CmButtonStyle>
  );
}

type ButtonMenuPropsType = {
  config: IButtonMenuConfig;
  onChange: (value: any) => void;
};

function CmButtonDropdownMenu({ config, onChange }: ButtonMenuPropsType) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onChangeMenuItem = (value: any) => {
    handleClose();
    onChange(value);
  };
  return (
    <div className={classes.button}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {config.placeholder}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {config.options.map(({ label, value }) => {
          return (
            <MenuItem
              key={value}
              onClick={() => onChangeMenuItem(value)}
            >
              {label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export { CmButton, CmButtonDropdownMenu, CmIconButton };
