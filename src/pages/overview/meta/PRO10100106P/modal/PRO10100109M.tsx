import { Button } from '@mui/material';

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
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          hidden
        />
      </Button>
    </CmModal>
  );
}
