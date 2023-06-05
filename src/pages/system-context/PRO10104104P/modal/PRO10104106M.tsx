import { Box, TextField, Typography } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type EditDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDatasourceModal({ visible, handleSave, handleClose }: EditDatasourceModalProps) {
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
      title="Edit Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>System Context Name</span>
        <Typography className="textData">SYSTEM_CONTEXT_TEST</Typography>
      </label>
      <label className="labelFormArea">
        <span>Datasource</span>
        <TextField
          className="labelTextField"
          defaultValue="tibero6_dev"
          size="small"
        />
      </label>
    </CmModal>
  );
}
