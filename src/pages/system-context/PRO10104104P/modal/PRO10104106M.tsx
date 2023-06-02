import { TextField, Typography } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type EditDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDatasourceModal({ visible, handleSave, handleClose }: EditDatasourceModalProps) {
  return (
    <CmModal
      title="Edit Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>System Context Name</span>
        <Typography className="textData">SYSTEM_CONTEXT_TEST</Typography>
      </label>
      <label className="labelFormArea">
        <span>Datasource</span>
        <TextField
          className="labelTextField"
          defaultValue="tibero6_dev"
          size="small"
        />
      </label>
    </CmModal>
  );
}
