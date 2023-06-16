import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import { ApplicationApi } from '@/apis';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { DeleteApplicationDto } from '@/types/dtos/overviewDtos';

type DeleteModalPrpos = {
  data?: ApplicationDto;
  visible: boolean;
  handleSave: () => void;
  handleClose: () => void;
};

export default function DeleteModal({ data, visible, handleSave, handleClose }: DeleteModalPrpos) {
  const handleDelete = async () => {
    const deleteApplication: DeleteApplicationDto = {
      resource_id: data?.resource_id,
      creator: data?.creator,
    };

    try {
      if (deleteApplication) {
        await ApplicationApi.deleteApplication(deleteApplication);
      }
      handleSave();
    } catch (error) {
      console.error('Delete application failed:', error);
    }
  };
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
        btnTitle="Delete"
        startIcon={<></>}
        className=""
        color="error"
        onClick={handleDelete}
      />
    </Box>
  );

  return (
    <CmModal
      title="Delete Application"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this application ?</p>
    </CmModal>
  );
}
