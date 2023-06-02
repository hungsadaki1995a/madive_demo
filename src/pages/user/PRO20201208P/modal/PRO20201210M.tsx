import { TextField } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditRoleModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditRoleModal({ visible, handleSave, handleClose }: EditRoleModalProps) {
  return (
    <CmModal
      title="Edit Role"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
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
