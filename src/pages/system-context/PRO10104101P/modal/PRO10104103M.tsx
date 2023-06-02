import { TextField } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditSystemContextModal({ visible, handleSave, handleClose }: EditSystemContextModalProps) {
  return (
    <CmModal
      title="Edit System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
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
