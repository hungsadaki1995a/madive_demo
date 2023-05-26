import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { Box } from '@mui/material';

type TestCaseDeleteModalProps = {
  isOpen: boolean;
  handleClose: (confirmed?: boolean) => void;
};

export default function TestCaseDeleteModal({ isOpen, handleClose }: TestCaseDeleteModalProps) {
  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={() => handleClose(false)}
      />
      <CmButton
        variant="contained"
        btnTitle="OK"
        startIcon={<></>}
        className=""
        color="info"
        onClick={() => handleClose(true)}
      />
    </Box>
  );
  return (
    <CmModal
      title="Delete Test Case"
      visible={isOpen}
      onClose={() => handleClose(false)}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this testcase ?</p>
    </CmModal>
  );
}
