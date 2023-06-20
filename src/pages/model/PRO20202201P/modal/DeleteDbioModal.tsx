import { useCallback } from 'react';

import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import DbioApi from '@/apis/DbioApi';
import DbioModel from '@/types/models/dbioModel';
import { notify } from '@/utils/notify';

type DeleteDbioModalPrpos = {
  visible: boolean;
  fetchTableData?: () => void;
  handleClose: (clearSelected?: boolean) => void;
  selectedRows: DbioModel[];
};

export default function DeleteDbioModal({ visible, fetchTableData, handleClose, selectedRows }: DeleteDbioModalPrpos) {
  // Delete Dbio Excute
  const handleSave = useCallback(async () => {
    const res = (await DbioApi.deleteDbio(selectedRows)) as any;
    if (res?.dto?.value !== 'Success') {
      notify.error(res?.dto?.value);
    } else notify.success(res?.dto?.value);
    fetchTableData?.();
    handleClose(true);
  }, [selectedRows, fetchTableData]);

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
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
      title="Delete Dbio"
      visible={visible}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this dbio ?</p>
    </CmModal>
  );
}
