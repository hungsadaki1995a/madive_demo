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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import React from 'react';
import { IButtonMenuConfig } from '../organisms/CmCommonTable/types';
import { CmButtonStyle } from './Atoms.Styled';

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

function CmButton(props: btnPropsType) {
  const { id, startIcon, className, onClick, variant, color, btnTitle, disabled } = props;

  // === variant===
  // 'contained' - bule
  // 'string' - contents
  // 'outlined' - 'logout'
  // 'text'

  return (
    <CmButtonStyle>
      {/* <CmButtonBox variant="contained" disableRipple> */}
      <Button
        id={id}
        startIcon={startIcon}
        className={className}
        type="button"
        variant={variant}
        onClick={onClick}
        color={color}
        disabled={disabled}
      >
        {btnTitle ? <span>{btnTitle}</span> : null}
      </Button>
    </CmButtonStyle>
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
    <div>
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

export { CmButton, CmIconButton, CmButtonDropdownMenu };
