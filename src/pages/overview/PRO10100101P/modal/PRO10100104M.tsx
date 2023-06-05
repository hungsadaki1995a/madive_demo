import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';

// Common Atoms
import { CmButton, CmIconButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

// img, icon
import { ReactComponent as ModalAdd } from '@/stylesheets/images/cmModalAdd.svg';
import { ReactComponent as ModalDelIcon } from '@/stylesheets/images/cmModalDelIcon.svg';

type ServiceGroupRegistrationModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ServiceGroupRegistrationModal({
  visible,
  handleSave,
  handleClose,
}: ServiceGroupRegistrationModalProps) {
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClose}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Service Group Registration"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
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
