import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { CmUpload } from '@/components/atoms/CmUpload';

type ImportExcelModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  onChange?: (file: any) => void;
};

export default function ImportExcelModal({ visible, handleSave, handleClose, onChange }: ImportExcelModalProps) {
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
      title="Import Excel"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <Box className="formBtw">
        <CmUpload onChange={onChange} />
        <span>
          <CmButton
            variant="contained"
            btnTitle="Add"
          />
          <CmButton
            variant="contained"
            btnTitle="Excel Sample"
          />
        </span>
      </Box>
      <TextField
        className="fullWidth"
        fullWidth
        multiline
        rows={4}
        disabled
      />
    </CmModal>
  );
}
