import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import GroupManagement from '@/apis/GroupManagement';
import { ConfigGroupDto } from '@/types/dtos/groupManagementDtos';
import { notify } from '@/utils/notify';

type DeleteGroupModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataForDelete: ConfigGroupDto[];
  resetPageAndRefresh?: () => void;
};

export default function DeleteGroupModal({
  visible,
  handleSave,
  handleClose,
  resetPageAndRefresh,
  dataForDelete,
}: DeleteGroupModalPrpos) {
  handleSave = async () => {
    const response = await GroupManagement.deleteGroupList([...dataForDelete]);

    if (!response?.header.responseCode.includes('200')) {
      handleClose();
      return;
    }

    resetPageAndRefresh?.();
    handleClose();

    notify.success('Delete success!');
  };

  const displayDeleteConfirmation = (dataForDelete: ConfigGroupDto[]) => {
    return (
      '그룹' +
      dataForDelete.map((item) => ` ${item.group_id}[${item.group_name}]`).join(' ') +
      ' 를 정말로 삭제하시겠습니까?'
    );
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
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Delete Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <p className="pointTxt">{displayDeleteConfirmation(dataForDelete)}</p>
    </CmModal>
  );
}
