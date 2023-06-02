import { TextField, Typography } from '@mui/material';

import CmModal from '@/components/atoms/CmModal';

type CreateDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateDatasourceModal({ visible, handleSave, handleClose }: CreateDatasourceModalProps) {
  return (
    <CmModal
      title="Create Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Node</span>
        <Typography className="textData">Dev Server</Typography>
      </label>
      <label className="labelFormArea">
        <span>Application</span>
        <Typography className="textData">SHApp</Typography>
      </label>
      <label className="labelFormArea">
        <span>System Context Name</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
      <label className="labelFormArea">
        <span>Datasource</span>
        <TextField
          className="labelTextField"
          size="small"
        />
      </label>
    </CmModal>
  );
}
