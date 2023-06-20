import { useCallback, useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import Loader from '@/components/molecules/Loader';

import { RoleApi } from '@/apis';
import RoleModel from '@/types/models/roleModel';
import { notify } from '@/utils/notify';

type DeleteRoleModalPrpos = {
  visible: boolean;
  handleClose: () => void;
  selectedList: any[];
  fetchTableData: () => void;
};

export default function DeleteRoleModal({ visible, handleClose, selectedList, fetchTableData }: DeleteRoleModalPrpos) {
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMsg, setIsLoadingMsg] = useState<boolean>(false);

  //Get Group List By Role
  const getDeleteConfirmMessage = useCallback(async (selectedList: RoleModel[]) => {
    setIsLoadingMsg(true);
    setIsLoading(true);
    const res = await RoleApi.getDeleteConfigData(selectedList);
    setDeleteConfirmMessage(res);
    setIsLoadingMsg(false);
    setIsLoading(false);
  }, []);

  // Delete Role Excute
  const handleDeleteRole = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = (await RoleApi.deleteRoles(selectedList)) as any;
      notify.success(res?.dto?.value);
    } catch (error) {
      notify.error(error?.data?.exception?.message);
    }
    setIsLoading(false);
    fetchTableData?.();
    handleClose();
  }, [selectedList]);

  useEffect(() => {
    if (visible) {
      getDeleteConfirmMessage(selectedList);
    } else setDeleteConfirmMessage('Are you sure to delete this role ?');
  }, [visible]);

  const handleCloseBtn = useCallback(() => {
    if (!isLoading) handleClose();
  }, [isLoading]);

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        id="rightBtn1"
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        onClick={handleClose}
        disabled={isLoading}
      />
      <CmButton
        id="rightBtn2"
        variant="contained"
        btnTitle="Delete"
        startIcon={<></>}
        className=""
        color="error"
        onClick={handleDeleteRole}
        disabled={isLoading}
      />
    </Box>
  );

  return (
    <CmModal
      title="Delete Role"
      visible={visible}
      onClose={handleCloseBtn}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      {isLoadingMsg ? (
        <Loader />
      ) : (
        <p
          className="pointTxt"
          style={{ whiteSpace: 'pre-line' }}
        >
          {deleteConfirmMessage || 'Are you sure to delete this role ?'}
        </p>
      )}
    </CmModal>
  );
}
