/******************************************************
 * Program ID : src/componetnts/atoms/CmModal.js
 * Program Name : 공통 모달 컴포넌트
 * Create On : 2023.05.17
 * 개 요 : 공통 모달 컴포넌트
 * ====================================================
 * 변경 이력     수정자      내용
 * ====================================================
 * 2023.05.17   김정아 차장   최초 작성
 ******************************************************/
import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { CmModalStyle } from './Atoms.Styled';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import { ReactComponent as ModalClose } from '@/stylesheets/images/modalClose.svg';

type propsType = {
  className: string;
  title: string;
  visible: boolean;
  onClick?: () => void;
  onClose: () => void;
  content?: JSX.Element;
  children: React.ReactNode;
};

function CmModal(props: propsType) {
  const { className, title, visible, onClick, onClose, content, children } = props;

  return (
    <Modal open={visible}>
      <CmModalStyle className={className}>
        {/* Header */}
        <Box className="header">
          <Typography>{title}</Typography>
          <CmIconButton
            btnTitle=""
            iconName={<ModalClose />}
            onClick={onClose}
          />
        </Box>

        {/* Contents */}
        <Box className="contents">{children}</Box>

        {/* Footer */}
        <Box className="footer">
          {/* Left Btn */}
          <CmButton
            id="leftBtn"
            variant="text"
            btnTitle="Test"
            startIcon={<></>}
            className=""
            color="info"
          />

          {/* Right Btn */}
          <Box className="alignL">
            <CmButton
              id="rightBtn1"
              variant="text"
              btnTitle="Cancel"
              startIcon={<></>}
              className=""
              color="info"
              onClick={onClose}
            />
            <CmButton
              id="rightBtn2"
              variant="contained"
              btnTitle="Save"
              startIcon={<></>}
              className=""
              color="info"
              onClick={onClick}
            />
          </Box>
        </Box>
      </CmModalStyle>
    </Modal>
  );
}
export default CmModal;
