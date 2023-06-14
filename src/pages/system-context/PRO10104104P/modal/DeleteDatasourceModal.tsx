import { Typography } from '@material-ui/core';
import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import SystemContextApi from '@/apis/SystemContextApi';
import { ConfigDto } from '@/types/dtos/systemContextDtos';
import { notify } from '@/utils/notify';

import { IPropertyList } from '@/pages/system-context/PRO10104104P/type';

type DeleteDatasourceModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataRow: ConfigDto;
  dataProp: IPropertyList;
  resetPageAndRefresh?: () => void;
};

export default function DeleteDatasourceModal({
  visible,
  handleSave,
  handleClose,
  dataRow,
  dataProp,
  resetPageAndRefresh,
}: DeleteDatasourceModalPrpos) {
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
    const response = await SystemContextApi.deleteDataSource({
      key_parameter: dataRow.key_parameter,
      node_id: dataProp.node_id,
      physical_name: dataRow.physical_name,
      property_key: 'APPLICATION_SYSTEM_CONTEXT_{0}_DATASOURCE',
      resource_id: dataProp.resource_id,
      resource_type: 'APPLICATION',
    });

    if (!response?.header.responseCode.includes('200')) {
      handleClose();
      notify.error(response?.dto?.value);

      return;
    }

    resetPageAndRefresh?.();

    handleClose();

    notify.success('Delete success!');
  };

  return (
    <CmModal
      title="Delete System Context Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <p className="pointTxt">Are you sure to delete this system context datasource?</p>
      <Typography>
        {dataRow?.key_parameter} / {dataRow?.property_value}
      </Typography>
    </CmModal>
  );
}
