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
import React, { useEffect, useState, useRef } from 'react';
import { Box, TextField, Button, IconButton, Snackbar, Alert } from '@mui/material';
import { OverviewStyled } from './Overview.Styled';

// Common Atoms
import { CmCard, CmCardAdd } from '@/components/atoms/CmCard';
import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

// Templates
import CmSearch from '@/components/templates/CmSearch';
import CmPageTitle from '@/components/templates/CmPageTitle';

// img, icon
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';
import { ReactComponent as CloseIcon } from '@/stylesheets/images/SnackCloseIcon.svg';
import { ReactComponent as SuccessIcon } from '@/stylesheets/images/SnackSuccessIcon.svg';

type propsType = {
  title: string;
};

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

  return (
    <OverviewStyled>
      {/* Search */}
      <CmSearch />

      {/* SubTitle */}
      <CmPageTitle />

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
        open={successOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          icon={<SuccessIcon />}
          variant="filled"
          severity="success"
        >
          success 텍스트 영역
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
