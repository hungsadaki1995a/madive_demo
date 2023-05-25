/******************************************************
 * Program ID : src/pages/demo/Snackbar.tsx
 * Program Name : 공통 스낵바 참고 페이지
 * Create On : 2023.05.21
 * 개 요 : 공통 스낵바 참고 페이지
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.21   김정아 차장   최초 작성
 ******************************************************/
import React, { useEffect, useState } from 'react';
import { Stack, Box, Button, IconButton, Snackbar, Alert, SnackbarCloseReason } from '@mui/material';
import { SnackbarStyled } from './CmCpst.Styled';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';

// img, icon
import { ReactComponent as CloseIcon } from '@/stylesheets/images/SnackCloseIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';
// import { ReactComponent as WarningIcon } from '@/stylesheets/images/SnackWarningIcon.svg' - svg 오류로 인해 불러올 수 없습니다.
import WarningIcon from '@mui/icons-material/WarningAmber';
import { ReactComponent as ErrorIcon } from '@/stylesheets/images/SnackErrorIcon.svg';

function SnackBar() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSuccessClick = () => {
    setSuccessOpen(true);
  };
  const handleInfoClick = () => {
    setInfoOpen(true);
  };
  const handleWarningClick = () => {
    setWarningOpen(true);
  };
  const handleErrorClick = () => {
    setErrorOpen(true);
  };

  const handleClose = (e: React.SyntheticEvent<any> | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessOpen(false);
    setInfoOpen(false);
    setWarningOpen(false);
    setErrorOpen(false);
  };

  return (
    <SnackbarStyled>
      <Stack
        direction="row"
        spacing={2}
      >
        <CmButton
          variant="contained"
          onClick={handleSuccessClick}
          btnTitle="success - Snackbar"
        />
        <CmButton
          variant="contained"
          onClick={handleInfoClick}
          btnTitle="info - Snackbar"
        />
        <CmButton
          variant="contained"
          onClick={handleWarningClick}
          btnTitle="warning - Snackbar"
        />
        <CmButton
          variant="contained"
          onClick={handleErrorClick}
          btnTitle="error - Snackbar"
        />
      </Stack>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="success"
        >
          success 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={infoOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="info"
        >
          info 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={warningOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          icon={<WarningIcon />}
          variant="filled"
          severity="warning"
        >
          warning 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          icon={<ErrorIcon />}
          variant="filled"
          severity="error"
        >
          error 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>
    </SnackbarStyled>
  );
}
export default SnackBar;
