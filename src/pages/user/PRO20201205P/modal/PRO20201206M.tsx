import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import GroupManagement from '@/apis/GroupManagement';
import { GroupManagementDto } from '@/types/dtos/groupManagementDtos';
import { notify } from '@/utils/notify';

const initialFormData: GroupManagementDto = {
  description: '',
  group_id: '',
  group_name: '',
};

type CreateGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  resetPageAndRefresh?: () => void;
};

export default function CreateGroupModal({
  visible,
  handleSave,
  handleClose,
  resetPageAndRefresh,
}: CreateGroupModalProps) {
  const resolver = classValidatorResolver(GroupManagementDto);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    values: initialFormData,
    resolver,
  });

  handleSave = handleSubmit(async (data: GroupManagementDto) => {
    const response = await GroupManagement.createNewGroup({
      group_id: data.group_id,
      group_name: data.group_name,
      description: data.description,
    });

    if (response?.dto?.value !== 'Success') {
      notify.error('Create fail! Duplication');
      return;
    }

    resetPageAndRefresh?.();

    handleClose();
    reset(initialFormData);

    notify.success('Create success!');
  });

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
        btnTitle="OK"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSave}
      />
    </Box>
  );

  return (
    <CmModal
      title="Create Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <label className="labelFormArea">
        <span>Group ID</span>
        <Controller
          name="group_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="key"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.group_id}
              helperText={errors.group_id?.message}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Group Name</span>
        <Controller
          name="group_name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="value"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.group_name}
              helperText={errors.group_name?.message}
            />
          )}
        />
      </label>
      <label className="labelFormArea">
        <span>Description</span>
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              fullWidth
              id="value"
              variant="outlined"
              value={value}
              placeholder="*"
              onChange={(data) => {
                onChange(data);
              }}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
      </label>
    </CmModal>
  );
}
