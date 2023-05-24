import { forwardRef } from 'react';
import { observer } from 'mobx-react';
import UserForm, { UserFormRefType } from './UserForm';
import { useStore } from '@/utils';
import UserModel from '@/types/models/userModel';
import UserApi from '@/apis/UserApi';

type UpdateModalProps = {
  onSuccess?: (data: UserModel) => void;
};
const UpdateModal = ({ onSuccess }: UpdateModalProps, ref: React.Ref<UserFormRefType>) => {
  const { AlertStore } = useStore();

  const submitForm = async (formData: UserModel) => {
    await UserApi.editUser(formData);
    AlertStore.openApiAlert('success', 'Update User Successfully!');
    onSuccess?.(formData);
  };

  return (
    <>
      <UserForm
        ref={ref}
        header="Update User"
        submitLabel="Update"
        cancelLabel="Cancel"
        onSubmit={submitForm}
        disabledFields={['userId']}
      />
    </>
  );
};

export default observer(forwardRef(UpdateModal));
