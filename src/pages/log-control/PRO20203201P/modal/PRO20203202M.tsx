import { TextField } from '@mui/material';

import { CmDataSelect } from '@/components/atoms/CmDataInput';
import CmModal from '@/components/atoms/CmModal';

type AddLogControlItemModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function AddLogControlItemModal({ visible, handleSave, handleClose }: AddLogControlItemModalProps) {
  return (
    <CmModal
      title="Add Log Control Item"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>User Key</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>File Name</span>
        <TextField
          className="labelTextField"
          defaultValue="1"
          type="password"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Log Level</span>
        <CmDataSelect className="" />
      </label>
      <label className="labelFormArea">
        <span>Modifier</span>
        <TextField
          className="labelTextField"
          defaultValue="admin"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
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
