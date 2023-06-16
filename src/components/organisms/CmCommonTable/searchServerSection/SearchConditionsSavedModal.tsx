import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import { CmButton } from '@/components/atoms/CmButton';
import CmModal from '@/components/atoms/CmModal';
import { CmTextField } from '@/components/atoms/CmTextField';

import { useStore } from '@/utils';

import { SaveCacheConditionForm } from '../types';

type SaveTestResultModalProps = {
  visible: boolean;
  handleSave: (conditionName?: string) => void;
  handleClose: () => void;
};

export default function SearchConditionsSavedModal({ visible, handleSave, handleClose }: SaveTestResultModalProps) {
  const [isExistConditionName, setIsExistConditionName] = useState<boolean>(false);
  const { SearchServerCachedStore } = useStore();
  const { pathname } = useLocation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SaveCacheConditionForm>();

  const footerRender = () => (
    <Box className="alignL">
      <CmButton
        variant="text"
        btnTitle="Cancel"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleClose}
      />
      <CmButton
        variant="contained"
        btnTitle="Save"
        startIcon={<></>}
        className=""
        color="info"
        onClick={handleSubmit(handleSaveConditionGroup)}
      />
    </Box>
  );

  const handleSaveConditionGroup = ({ conditionName }: SaveCacheConditionForm) => {
    const isAlreadyExist = SearchServerCachedStore.checkSearchGroupNameAlready(conditionName, pathname);
    if (isAlreadyExist) {
      setIsExistConditionName(isAlreadyExist);
    } else {
      handleSave(conditionName);
    }
  };

  return (
    <CmModal
      title="Save search conditions"
      visible={visible}
      onClose={handleClose}
      className="medium"
      footerRenderAs={footerRender}
    >
      <form onSubmit={handleSubmit(handleSaveConditionGroup)}>
        <Controller
          name="conditionName"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <CmTextField
              type="inside"
              placeholder="Search condition name *"
              onChange={onChange}
              value={value}
              error={!!errors?.conditionName || isExistConditionName}
              helperText={
                errors.conditionName
                  ? 'Search condition name is required'
                  : isExistConditionName
                  ? 'Search condition name is already exists.'
                  : ''
              }
            />
          )}
        />
      </form>
    </CmModal>
  );
}
