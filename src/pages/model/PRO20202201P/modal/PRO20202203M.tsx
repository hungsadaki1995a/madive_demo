import { TextField } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditDbioModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDbioModal({ visible, handleSave, handleClose }: EditDbioModalProps) {
  return (
    <CmModal
      title="Edit Dbio"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Vender</span>
        <TextField
          className="labelTextField"
          defaultValue="NQT"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Alias</span>
        <TextField
          className="labelTextField"
          defaultValue="22112344"
          disabled
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>ID</span>
        <TextField
          className="labelTextField"
          defaultValue="4185"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Password</span>
        <TextField
          className="labelTextField"
          defaultValue="3185"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>IP</span>
        <TextField
          className="labelTextField"
          defaultValue="1111"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Port</span>
        <TextField
          className="labelTextField"
          defaultValue="1111"
          size="small"
        />
      </label>
    </CmModal>
  );
}
