import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type DeleteNodeModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteNodeModal({ visible, handleSave, handleClose }: DeleteNodeModalPrpos) {
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
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Delete Node"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this node ?</p>
    </CmModal>
  );
}
