/******************************************************
 * Program ID : src/pages/overview/AppSG.tsx
 * Program Name : App & SG
 * Create On : 2023.05.23
 * 개 요 : AppSG.tsx
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.23   김정아 차장   최초 작성
 ******************************************************/
import { useRef, useState } from 'react';

import { Alert, Box, Button, IconButton, Snackbar, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

// Common Atoms
import { CmCard, CmCardAdd } from '@/components/atoms/CmCard';
import CmModal from '@/components/atoms/CmModal';
import { CmPageTselectBtw } from '@/components/templates/CmPageTitle';
// Templates
import CmSearch from '@/components/templates/CmSearch';

import * as CmStyle from '@/stylesheets/common';
// img, icon
import { ReactComponent as CloseIcon } from '@/stylesheets/images/SnackCloseIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';

import { OverviewStyled } from './Overview.Styled';

type propsType = {
  title: string;
};

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

function AppSG(props: propsType) {
  const { title } = props;
  const [isModifyVisible, setIsModifyVisible] = useState(false);
  const [isDelVisible, setIsDelVisible] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const boardId = useRef();

  // 초기화
  const handleInit = () => {
    boardId.current = undefined;
    setIsModifyVisible(false);
    setIsDelVisible(false);
    //setSuccessOpen(false);
  };

  // 수정 모달 팝업 이동
  const handleModify = (e: string) => {
    console.log('AppSG handleClick', e);
    if (e === 'I' || e === 'E') {
      setIsModifyVisible(!isModifyVisible);
    } else {
      setIsDelVisible(!isDelVisible);
    }
  };

  // 모달 팝업 저장/수정
  const handleSave = () => {
    setSuccessOpen(!successOpen);
    handleInit();
  };

  // 모달 팝업 종료
  const handleClose = () => {
    handleInit();
  };

  // SnackBar 종료
  const handleSnackBarClose = () => {
    setSuccessOpen(!successOpen);
  };

  const classes = useStyles();

  return (
    <OverviewStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTselectBtw />

      {/* Card */}
      <Box className="cardArea">
        <CmCard onClick={(e) => handleModify(e)} />
        <CmCard onClick={(e) => handleModify(e)} />
        <CmCard onClick={(e) => handleModify(e)} />
        <CmCard onClick={(e) => handleModify(e)} />
        <CmCardAdd />
      </Box>

      {/* Edit Application - Modal */}
      <CmModal
        title="Edit Application"
        visible={isModifyVisible}
        onClick={handleSave}
        onClose={handleClose}
        className="medium"
      >
        {/* contents */}
        <label className="labelFormArea">
          <span>Physical Name</span>
          <TextField
            className="labelTextField"
            defaultValue="Luke Test"
            size="small"
          />
        </label>
        <label className="labelFormArea">
          <span>Logical Name</span>
          <TextField
            className="labelTextField"
            defaultValue="1"
            type="password"
            size="small"
          />
        </label>
        <label className="labelFormArea">
          <span>Package</span>
          <TextField
            className="labelTextField"
            defaultValue="test"
            size="small"
          />
        </label>
        <label className="labelFormArea">
          <span>Description</span>
          <TextField
            className="labelTextField"
            multiline
            rows={4}
            defaultValue="Default Value"
          />
        </label>
      </CmModal>

      {/* Delete Application - Modal */}
      <CmModal
        title="Delete Application"
        visible={isDelVisible}
        onClick={handleSave}
        onClose={handleClose}
        className="medium"
      >
        {/* contents */}
        <p className="pointTxt">Are you sure to delete this application ?</p>
      </CmModal>

      <Snackbar
        className={classes.lbSnack}
        open={successOpen}
        autoHideDuration={993000}
        onClose={handleSnackBarClose}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="success"
        >
          The save was success
          <Box className="alignR">
            <Button variant="text">txt-txt</Button>
            <IconButton onClick={handleSnackBarClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Alert>
      </Snackbar>
    </OverviewStyled>
  );
}
export default AppSG;
