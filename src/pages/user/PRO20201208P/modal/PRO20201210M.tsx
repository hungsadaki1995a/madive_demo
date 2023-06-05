import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type EditRoleModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditRoleModal({ visible, handleSave, handleClose }: EditRoleModalProps) {
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
        btnTitle="OK"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Edit Role"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Role ID</span>
        <TextField
          className="labelTextField"
          defaultValue="AdminRole"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Role Name</span>
        <TextField
          className="labelTextField"
          defaultValue="AdminRole"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          defaultValue="AdminRole"
          size="small"
        />
      </label>
    </CmModal>
  );
}
