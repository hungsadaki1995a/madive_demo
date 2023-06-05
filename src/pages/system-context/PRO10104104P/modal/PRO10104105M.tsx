import { Box, TextField, Typography } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type CreateDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateDatasourceModal({ visible, handleSave, handleClose }: CreateDatasourceModalProps) {
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
      title="Create Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Node</span>
        <Typography className="textData">Dev Server</Typography>
      </label>
      <label className="labelFormArea">
        <span>Application</span>
        <Typography className="textData">SHApp</Typography>
      </label>
      <label className="labelFormArea">
        <span>System Context Name</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Datasource</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
    </CmModal>
  );
}
