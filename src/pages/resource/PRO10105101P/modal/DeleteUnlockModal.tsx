import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type DeleteUnlockModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteUnlockModal({ visible, handleSave, handleClose }: DeleteUnlockModalProps) {
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
        btnTitle="Unlock"
        startIcon={<></>}
        className=""
        color="error"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Unlock Resource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to unlock this resource ?</p>
    </CmModal>
  );
}
