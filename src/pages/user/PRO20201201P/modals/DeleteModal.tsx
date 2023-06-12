import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type DeleteModalPrpos = {
  visible: boolean;
  handleSave: () => Promise<void>;
  handleClose: () => void;
};

export default function DeleteModal({ visible, handleSave, handleClose }: DeleteModalPrpos) {
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Delete"
        startIcon={<></>}
        className=""
        color="error"
        onClick={() => {
          handleSave();
          handleClose();
        }}
      />
    </Box>
  );

  return (
    <CmModal
      title="Delete User"
      visible={visible}
      onSave={() => {
        handleSave();
        handleClose();
      }}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <p className="pointTxt">Are you sure to delete this user ?</p>
    </CmModal>
  );
}
