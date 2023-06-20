import { useState } from 'react';

import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SaveTestCaseModal from './PRO10102118M';

type ViewTestResultModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ViewTestResultModal({ visible, handleSave, handleClose }: ViewTestResultModalProps) {
  const [isSaveTestCaseModalVisible, setIsSaveTestCaseModalVisible] = useState(false);

  // Save Test Case Modal Open
  const handleSaveTestCaseModalOpen = () => {
    setIsSaveTestCaseModalVisible(true);
  };

  // Save Test Case Modal Close
  const handleSaveTestCaseModalClose = () => {
    setIsSaveTestCaseModalVisible(false);
  };

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        onClick={handleSaveTestCaseModalOpen}
      />
    </Box>
  );

  return (
    <>
      <CmModal
        title="View Test Result"
        visible={visible}
        onSave={handleSave}
        onClose={handleClose}
        className="medium"
        footerRenderAs={footerRender}
      >
        {/* contents */}
        contents area
      </CmModal>

      {/* Save Test Case - Modal */}
      <SaveTestCaseModal
        visible={isSaveTestCaseModalVisible}
        handleClose={handleSaveTestCaseModalClose}
      />
    </>
  );
}
