/******************************************************
 * Program ID : src/pages/demo/Modal.tsx
 * Program Name : 공통 모달 참고 페이지
 * Create On : 2023.05.17
 * 개 요 : 공통 모달 참고 페이지
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.17   김정아 차장   최초 작성
 ******************************************************/
import React, { useEffect, useRef, useState } from 'react';
import { TextField, Stack } from '@mui/material';

import { ModalStyled } from './CmCpst.Styled';

// Common Atoms
import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

// img, icon
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';

function Modal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [isWriteVisible, setIsWriteVisible] = useState(false);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isModifyVisible, setIsModifyVisible] = useState(false);
  const [isDelVisible, setIsDelVisible] = useState(false);
  const boardId = useRef();

  // 초기화
  const handleInit = () => {
    boardId.current = undefined;
    setIsWriteVisible(false);
    setIsDetailVisible(false);
    setIsModifyVisible(false);
    setIsDelVisible(false);
  };

  // 작성 모달 팝업 오픈
  const handleWrite = () => {
    setIsWriteVisible(!isWriteVisible);
  };

  // 세부 모달 팝업 이동
  const handleDetail = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  // 수정 모달 팝업 이동
  const handleModify = () => {
    setIsModifyVisible(!isModifyVisible);
    !!boardId.current && setIsWriteVisible(!isModifyVisible);
  };

  // 삭제 모달 팝업 오픈
  const handleDel = () => {
    setIsDelVisible(!isDelVisible);
  };

  // 모달 팝업 종료
  const handleClose = () => {
    handleInit();
  };

  return (
    <ModalStyled>
      <p>small medium large</p>

      <Stack direction="row" spacing={2}>
        <CmButton variant="contained" onClick={handleModify} btnTitle="Edit Application" />
        <CmButton variant="contained" onClick={handleWrite} btnTitle="Service Group Registration" />
        <CmButton variant="contained" onClick={handleDel} btnTitle="Delete Application" />
        <CmButton variant="contained" onClick={handleDetail} btnTitle="Detail Test History" />
      </Stack>

      {/* Edit Application - Modal */}
      <CmModal title="Edit Application" visible={isModifyVisible} onClose={handleClose} className="medium">
        {/* contents */}
        <label className="labelFormArea">
          <span>Physical Name</span>
          <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          {/* <TextField disabled defaultValue="Luke Test" hiddenLabel size="small" /> */}
        </label>
        <label className="labelFormArea">
          <span>Logical Name</span>
          <TextField className="labelTextField" defaultValue="1" type="password" size="small" />
        </label>
        <label className="labelFormArea">
          <span>Package</span>
          <TextField className="labelTextField" defaultValue="test" size="small" />
        </label>
        <label className="labelFormArea">
          <span>Description</span>
          <TextField className="labelTextField" multiline rows={4} defaultValue="Default Value" />
        </label>
      </CmModal>

      {/* Service Group Registration - Modal */}
      <CmModal title="Service Group Registration" visible={isWriteVisible} onClose={handleClose} className="medium">
        {/* contents */}
        <label className="inputArea">
          <TextField placeholder="Physical Name" size="small" />
          <TextField placeholder="Logical Name" size="small" />
          <CmButton variant="contained" startIcon={<ModalAdd />} />
        </label>

        <p>테이블 구조 이슈 완료후 작업 예정</p>
      </CmModal>

      {/* Delete Application - Modal */}
      <CmModal title="Delete Application" visible={isDelVisible} onClose={handleClose} className="medium">
        {/* contents */}
        <p className="pointTxt">Are you sure to delete this application ?</p>
      </CmModal>

      {/* Detail Test History - Modal */}
      <CmModal title="Detail Test History" visible={isDetailVisible} onClose={handleClose} className="large">
        {/* contents */}

        <Stack direction="row" spacing={5}>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
        </Stack>
        <Stack direction="row" spacing={5}>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
        </Stack>
        <Stack direction="row" spacing={5}>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
        </Stack>
        <Stack direction="row" spacing={5}>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
          <label className="labelFormArea half">
            <span>Physical Name</span>
            <TextField className="labelTextField" defaultValue="Luke Test" size="small" />
          </label>
        </Stack>

        <p>JSON Editor 적용 예정</p>
      </CmModal>
    </ModalStyled>
  );
}
export default Modal;
