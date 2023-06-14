import { useForm } from 'react-hook-form';

import { CmButton } from '@/components/atoms/CmButton';
import { CmTextField } from '@/components/atoms/CmTextField';
import CmFormDialog from '@/components/molecules/CmFormDialog';

import AppAndSGAPI from '@/apis/ServiceGroupApi';
import { IDialogBaseRef } from '@/types/common';
import { addNewApplicationDto } from '@/types/dtos/overviewDtos';
import { notify } from '@/utils/notify';

type Props = {
  resetList: () => void;
  formDiaLogAdd: React.MutableRefObject<IDialogBaseRef | null>;
};

const CreateApplicationModal = ({ resetList, formDiaLogAdd }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAdd = handleSubmit(async (data) => {
    const applicationDto: addNewApplicationDto = {
      creator: data.create,
      description: data.description,
      logical_name: data.logicalName,
      package_prefix: data.packageValue,
      physical_name: data.physicalName,
    };
    try {
      const responseData = await AppAndSGAPI.addNewApplication(applicationDto);

      formDiaLogAdd?.current?.hide();
      reset();
      resetList();
    } catch (errors) {
      notify.error(errors.data?.exception?.message);
    }
  });

  const handleClose = () => {
    reset();
    formDiaLogAdd.current?.hide();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <CmFormDialog
      title="Create Application"
      ref={formDiaLogAdd}
    >
      {/* Contents */}
      <form onSubmit={handleAdd}>
        <CmTextField
          type="outside"
          className="labelTextField"
          label="Physical Name"
          {...register('physicalName', { required: true })}
          error={!!errors.physicalName}
          helperText={errors.physicalName ? 'Physical Name is required' : ''}
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

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <CmButton
            variant="text"
            btnTitle="Reset"
            color="info"
            onClick={handleReset}
          />
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
              onClick={handleAdd}
            />
          </div>
        </div>
      </form>
    </CmFormDialog>
  );
};
export default CreateApplicationModal;
