import { TextField } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditApplicationModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditApplicationModal({ visible, handleSave, handleClose }: EditApplicationModalProps) {
  return (
    <CmModal
      title="Edit Application"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Physical Name</span>
        <TextField
          className="labelTextField"
          defaultValue="Luke Test"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Logical Name</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Package</span>
        <TextField
          className="labelTextField"
          defaultValue="test"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
      </label>
    </CmModal>
  );
}
