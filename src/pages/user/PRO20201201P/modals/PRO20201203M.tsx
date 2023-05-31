import { forwardRef } from 'react';

import { observer } from 'mobx-react';

import UserApi from '@/apis/UserApi';
import UserModel from '@/types/models/userModel';
import { useStore } from '@/utils';

import UserForm, { UserFormRefType } from './UserForm';

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
