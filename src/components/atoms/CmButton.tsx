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
import React from 'react';

import { Button, IconButton, Tooltip } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

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
export { CmButton, CmIconButton };
