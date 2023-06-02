import { Box, Button, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type ImportExcelModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ImportExcelModal({ visible, handleSave, handleClose }: ImportExcelModalProps) {
  return (
    <CmModal
      title="Import Excel"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <Box className="formBtw">
        {/* Upload File */}
        <Button
          variant="contained"
          component="label"
          className="fileUpBtn"
        >
          <input type="file" />
        </Button>
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
        defaultValue="Default Value"
      />
    </CmModal>
  );
}
