import { TextField } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditGroupModal({ visible, handleSave, handleClose }: EditGroupModalProps) {
  return (
    <CmModal
      title="Edit Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Group ID</span>
        <TextField
          className="labelTextField"
          defaultValue="Group 1"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Group Name</span>
        <TextField
          className="labelTextField"
          defaultValue="Group 1"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <TextField
          className="labelTextField"
          defaultValue="Group 1"
          size="small"
        />
      </label>
    </CmModal>
  );
}
