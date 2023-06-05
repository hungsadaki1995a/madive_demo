import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type DeleteMetaModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteMetaModal({ visible, handleSave, handleClose }: DeleteMetaModalPrpos) {
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
      title="Delete Meta"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this meta ?</p>
    </CmModal>
  );
}
