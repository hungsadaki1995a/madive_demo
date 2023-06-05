import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type EditDbioModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDbioModal({ visible, handleSave, handleClose }: EditDbioModalProps) {
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
      title="Edit Dbio"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Vender</span>
        <TextField
          className="labelTextField"
          defaultValue="NQT"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Alias</span>
        <TextField
          className="labelTextField"
          defaultValue="22112344"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>ID</span>
        <TextField
          className="labelTextField"
          defaultValue="4185"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Password</span>
        <TextField
          className="labelTextField"
          defaultValue="3185"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          defaultValue="1111"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Port</span>
        <TextField
          className="labelTextField"
          defaultValue="1111"
          size="small"
        />
      </label>
    </CmModal>
  );
}
