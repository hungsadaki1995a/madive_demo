import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type EditSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditSystemContextModal({ visible, handleSave, handleClose }: EditSystemContextModalProps) {
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
        btnTitle="Save"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Edit System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>SHApp - SYSTEM CONTEXT TEST</span>
      </label>
      <label className="labelFormArea">
        <span>key</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>value</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          size="small"
        />
      </label>
    </CmModal>
  );
}
