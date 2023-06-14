import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { SystemContextDtos } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

import { ISystemContextList } from '@/pages/system-context/PRO10104101P/type';

type DeleteSystemContextModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataRow: SystemContextDtos;
  dataProp: ISystemContextList;
  resetPageAndRefresh?: () => void;
};

export default function DeleteSystemContextModal({
  visible,
  handleSave,
  handleClose,
  dataRow,
  dataProp,
  resetPageAndRefresh,
}: DeleteSystemContextModalPrpos) {
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

  handleSave = async () => {
    const response = await SystemContextApi.deleteSystemContext({
      appName: dataProp.appName as string,
      key: dataRow.key,
      node_id: dataProp.node_id,
      resource_id: dataProp.resource_id,
      systemContextName: dataProp.systemContextName,
    });

    if (!response?.header.responseCode.includes('200')) {
      handleClose();
      return;
    }

    resetPageAndRefresh?.();
    handleClose();

    notify.success('Delete success!');
  };

  return (
    <CmModal
      title="Delete System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <p className="pointTxt">Are you sure to delete this system context ?</p>
    </CmModal>
  );
}
