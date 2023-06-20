import { useCallback } from 'react';

import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

type DeleteMetaModalPrpos = {
  visible: boolean;
  handleSave: () => void;
  handleClose: () => void;
  isFetching: boolean;
};

const DeleteMetaModal = ({ visible, handleSave, handleClose, isFetching = false }: DeleteMetaModalPrpos) => {
  const footerRender = useCallback(
    () => (
      <Box className="alignL">
        <CmButton
          id="rightBtn1"
          variant="text"
          btnTitle="Cancel"
          startIcon={<></>}
          className=""
          onClick={handleClose}
          disabled={isFetching}
        />
        <CmButton
          id="rightBtn2"
          variant="contained"
          btnTitle="Delete"
          startIcon={<></>}
          className=""
          color="error"
          onClick={handleSave}
          disabled={isFetching}
        />
      </Box>
    ),
    [handleClose, handleSave]
  );

  return (
    <CmModal
      title="Delete Meta"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this meta ?</p>
    </CmModal>
  );
};

export default DeleteMetaModal;
