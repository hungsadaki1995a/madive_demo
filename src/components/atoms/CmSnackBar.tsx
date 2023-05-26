/******************************************************
 * Program ID : src/pages/atoms/CmSnackbar.tsx
 * Program Name : 공통 스낵바 컴포넌트
 * Create On : 2023.05.25
 * 개 요 : 공통 스낵바 컴포넌트
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.25   김정아 차장   최초 작성
 ******************************************************/
// import { ReactComponent as WarningIcon } from '@/stylesheets/images/SnackWarningIcon.svg' - svg 오류로 인해 불러올 수 없습니다.
import WarningIcon from '@mui/icons-material/WarningAmber';
import { Alert, Box, Button, IconButton, Snackbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

import * as CmStyle from '@/stylesheets/common';
// img, icon
import { ReactComponent as CloseIcon } from '@/stylesheets/images/SnackCloseIcon.svg';
import { ReactComponent as ErrorIcon } from '@/stylesheets/images/SnackErrorIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';

// Styled
const useStyles = makeStyles(() => ({
  lbSnack: {
    '& .MuiPaper-root.MuiAlert-root': {
      width: '400px',
      height: '52px',
      alignItems: 'center',
      padding: '0 16px',
      margin: 0,
      // Icon
      '& .MuiAlert-icon': {
        width: '22px',
        justifyContent: 'center',
        marginRight: '8px',
      },

      // Message
      '& .MuiAlert-message': {
        width: 'calc(100% - 28px)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
        fontFamily: CmStyle.notoSansDJKFont.regular,
        color: CmStyle.color.colorT04,

        '& .alignR.MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
          '& button': {
            fontSize: '13px',
            fontFamily: CmStyle.notoSansDJKFont.regular,
            color: CmStyle.color.colorT01,
            textDecoration: 'underline',
            '&:hover': {
              background: 'none',
            },
          },
        },
      },

      // Success
      '&.MuiAlert-filledSuccess': {
        background: CmStyle.color.colorSuccessBg,
      },
      // Info
      '&.MuiAlert-filledInfo': {
        background: CmStyle.color.colorInfoBg,
      },
      // Warning
      '&.MuiAlert-filledWarning': {
        background: CmStyle.color.colorWarningBg,
      },
      // Error
      '& .MuiAlert-filledError': {
        background: CmStyle.color.colorErrorBg,

        '& .MuiAlert-message': {
          color: CmStyle.color.colorBg02,
        },
      },

      // Right Text
      '& .alignR.MuiBox-root button': {
        color: CmStyle.color.colorBg02,
      },
    },
  },
}));

function CmSnackBar() {
  const classes = useStyles();

  return (
    <>
      {/* Success */}
      <Snackbar
        className={classes.lbSnack}
        autoHideDuration={3000}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="success"
        >
          {/* text 영역 받음 */}
          success 텍스트 영역
          <Box className="alignR">
            {/* Btn Text 유무 있음 */}
            <Button variant="text">txt-txt</Button>
            {/* 닫기버튼 */}
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      {/* Info */}
      <Snackbar
        className={classes.lbSnack}
        autoHideDuration={3000}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="info"
        >
          info 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      {/* Warning */}
      <Snackbar
        className={classes.lbSnack}
        autoHideDuration={3000}
      >
        <Alert
          icon={<WarningIcon />}
          variant="filled"
          severity="warning"
        >
          warning 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>

      {/* Error */}
      <Snackbar
        className={classes.lbSnack}
        autoHideDuration={3000}
      >
        <Alert
          icon={<ErrorIcon />}
          variant="filled"
          severity="error"
        >
          error 텍스트 영역
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
}
export default CmSnackBar;
