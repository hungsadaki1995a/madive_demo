import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

// img, icon
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';
import { ReactComponent as ModalDelIcon } from '@/stylesheets/images/cmModalDelIcon.svg';

type EditServiceGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditServiceGroupModal({ visible, handleSave, handleClose }: EditServiceGroupModalProps) {
  return (
    <CmModal
      title="Edit Service Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <label className="inputArea">
        <TextField
          placeholder="Physical Name"
          size="small"
        />
        <TextField
          placeholder="Logical Name"
          size="small"
        />
        <CmButton
          variant="contained"
          startIcon={<ModalAdd />}
        />
      </label>

      <Table className="addRow">
        <TableHead>
          <TableRow>
            <TableCell>Physical Name</TableCell>
            <TableCell>Logical Name</TableCell>
            <TableCell className="iconBtn"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Header</TableCell>
            <TableCell>
              <TextField
                hiddenLabel
                fullWidth
                size="small"
                defaultValue="Logical name text"
              />
            </TableCell>
            <TableCell align="center">
              <CmIconButton iconName={<ModalDelIcon />} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CmModal>
  );
}
