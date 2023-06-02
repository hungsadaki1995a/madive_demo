import { TextField } from '@mui/material';

// Common Atoms
import CmModal from '@/components/atoms/CmModal';

type AddSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function AddSystemContextModal({ visible, handleSave, handleClose }: AddSystemContextModalProps) {
  return (
    <CmModal
      title="Add System Context"
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
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>value</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
    </CmModal>
  );
}
