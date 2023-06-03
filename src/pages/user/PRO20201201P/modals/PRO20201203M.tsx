// import { TextField } from '@mui/material';
// import CmModal from '@/components/atoms/CmModal';
// type EditUserModalProps = {
//   visible: boolean;
//   handleSave?: () => void;
//   handleClose: () => void;
// };
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
// export default function EditUserModal({ visible, handleSave, handleClose }: EditUserModalProps) {
//   return (
//     <CmModal
//       title="Edit User"
//       visible={visible}
//       onSave={handleSave}
//       onClose={handleClose}
//       className="medium"
//     >
//       {/* contents */}
// <label className="labelFormArea">
//   <span>Vender</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="NQT"
//     size="small"
//   />
// </label>
// <label className="labelFormArea">
//   <span>Alias</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="22112344"
//     disabled
//     size="small"
//   />
// </label>
// <label className="labelFormArea">
//   <span>ID</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="4185"
//     size="small"
//   />
// </label>
// <label className="labelFormArea">
//   <span>Password</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="3185"
//     size="small"
//   />
// </label>
// <label className="labelFormArea">
//   <span>IP</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="1111"
//     size="small"
//   />
// </label>
// <label className="labelFormArea">
//   <span>Port</span>
//   <TextField
//     className="labelTextField"
//     defaultValue="1111"
//     size="small"
//   />
// </label>
//     </CmModal>
//   );
// }
