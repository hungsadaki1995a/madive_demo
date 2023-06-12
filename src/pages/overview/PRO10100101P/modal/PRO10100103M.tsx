import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { CmButton } from '@/components/atoms/CmButton';
import { CmTextField } from '@/components/atoms/CmTextField';
import CmFormDialog from '@/components/molecules/CmFormDialog';

import AppAndSGAPI from '@/apis/ServiceGroupApi';
import { IDialogBaseRef } from '@/types/common';
import { ApplicationDto } from '@/types/dtos/applicationDtos';
import { editApplicationDto } from '@/types/dtos/overviewDtos';

type CmModalEditProps = {
  data?: ApplicationDto;
  resetList: () => void;
  formDialogLargeRef: React.MutableRefObject<IDialogBaseRef | null>;
};
const EditApplicationModal: React.FC<CmModalEditProps> = ({ resetList, data, formDialogLargeRef }) => {
  const { handleSubmit, register, setValue } = useForm();
  useEffect(() => {
    if (data) {
      setValue('logicalName', data.logical_name);
      setValue('packageValue', data.package_prefix);
      setValue('description', data.description);
    }
  }, [data, setValue]);

  const handleEdit = handleSubmit(async (formData) => {
    const editApplication: editApplicationDto = {
      creator: data?.creator,
      description: formData.description,
      logical_name: formData.logicalName,
      package_prefix: formData.packageValue,
      physical_name: data?.physical_name,
      resource_id: data?.resource_id,
    };

    try {
      // Send a request to edit the application
      await AppAndSGAPI.editApplication(editApplication);
      // Close the modal
      formDialogLargeRef.current?.hide();
      // Reset List
      resetList();
    } catch (error) {
      // Handle errors if any
      console.log(error);
    }
  });

  const handleClose = () => {
    formDialogLargeRef.current?.hide();
  };

  return (
    <CmFormDialog
      title="Edit Application"
      ref={formDialogLargeRef}
    >
      {/* Contents */}
      <form onSubmit={handleEdit}>
        <CmTextField
          type="outside"
          className="labelTextField"
          disabled
          defaultValue={data?.physical_name}
          label="Physical Name"
        />

        <CmTextField
          type="outside"
          className="labelTextField"
          label="Logical Name"
          {...register('logicalName')}
        />

        <CmTextField
          type="outside"
          className="labelTextField"
          label="Package"
          {...register('packageValue')}
        />

        <CmTextField
          type="outside"
          className="labelTextField"
          label="Description"
          {...register('description')}
          multiline
          rows={4}
        />

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <div>
            <CmButton
              variant="text"
              btnTitle="Cancel"
              color="info"
              onClick={handleClose}
            />
            <CmButton
              variant="contained"
              btnTitle="Save"
              onClick={handleEdit}
            />
          </div>
        </div>
      </form>
    </CmFormDialog>
  );
};

export default EditApplicationModal;
