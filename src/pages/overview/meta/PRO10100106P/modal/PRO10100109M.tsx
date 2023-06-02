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
