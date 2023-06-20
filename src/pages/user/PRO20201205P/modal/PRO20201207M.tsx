import { Controller, useForm } from 'react-hook-form';

import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Box, TextField } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';

import GroupManagement from '@/apis/GroupManagement';
import { GroupManagementDto } from '@/types/dtos/groupManagementDtos';
import { notify } from '@/utils/notify';

type EditGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
  dataForEdit: GroupManagementDto;
  resetPageAndRefresh?: () => void;
};

export default function EditGroupModal({
  visible,
  handleSave,
  handleClose,
  resetPageAndRefresh,
  dataForEdit,
}: EditGroupModalProps) {
  const resolver = classValidatorResolver(GroupManagementDto);

  const { description, group_id, group_name } = dataForEdit;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    values: { description, group_id, group_name },
    resolver,
  });

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
        btnTitle="Save"
        startIcon={<></>}
        className=""
        onClick={handleSave}
      />
    </Box>
  );

  handleSave = handleSubmit(async (data: GroupManagementDto) => {
    // todo
    const response = await GroupManagement.editGroupManagement({
      description: data.description,
      group_id: data.group_id,
      group_name: data.group_name,
    });

    if (response?.dto?.value !== 'Success') {
      return;
    }

    resetPageAndRefresh?.();
    handleClose();

    notify.success('Edit success!');
  });

  return (
    <CmModal
      title="Edit Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      {/* contents */}
      <label className="labelFormArea">
        <span>Group ID</span>
        <TextField
          className="labelTextField"
          defaultValue={dataForEdit?.group_id}
          disabled
          size="small"
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
              id="group_name"
              variant="outlined"
              value={value}
              defaultValue={dataForEdit?.group_name}
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
              id="description"
              variant="outlined"
              value={value}
              defaultValue={dataForEdit?.description}
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
