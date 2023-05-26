import { forwardRef } from 'react';

import { observer } from 'mobx-react';

import UserApi from '@/apis/UserApi';
import UserModel from '@/types/models/userModel';
import { useStore } from '@/utils';

import UserForm, { UserFormRefType } from './UserForm';

type CreateModalProps = {
  onSuccess?: (data?: UserModel) => void;
};
const CreateModal = ({ onSuccess }: CreateModalProps, ref: React.Ref<UserFormRefType>) => {
  const { AlertStore } = useStore();

  const submitForm = async (formData: UserModel) => {
    await UserApi.addUser(formData);
    AlertStore.openApiAlert('success', 'Add User Successfully!');
    onSuccess?.(formData);
  };

  return (
    <>
      <UserForm
        ref={ref}
        header="Add User"
        submitLabel="Create"
        cancelLabel="Cancel"
        onSubmit={submitForm}
      />
    </>
  );
};

export default observer(forwardRef(CreateModal));
