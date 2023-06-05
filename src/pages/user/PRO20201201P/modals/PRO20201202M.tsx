// import { TextField } from '@mui/material';
// import CmModal from '@/components/atoms/CmModal';
// type CreateUserModalProps = {
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

// export default function CreateUserModal({ visible, handleSave, handleClose }: CreateUserModalProps) {
//   return (
//     <CmModal
//       title="Create User"
//       visible={visible}
//       onSave={handleSave}
//       onClose={handleClose}
//       className="medium"
//     >
//       {/* contents */}
//       <label className="labelFormArea">
//         <span>User ID</span>
//         <TextField
//           className="labelTextField"
//           defaultValue="00_"
//           size="small"
//         />
//       </label>
//       <label className="labelFormArea">
//         <span>Password</span>
//         <TextField
//           className="labelTextField"
//           size="small"
//         />
//       </label>
//       <label className="labelFormArea">
//         <span>Name</span>
//         <TextField
//           className="labelTextField"
//           size="small"
//         />
//       </label>
//       <label className="labelFormArea">
//         <span>User Div</span>
//         <TextField
//           className="labelTextField"
//           size="small"
//         />
//       </label>
//       <label className="labelFormArea">
//         <span>E-mail</span>
//         <TextField
//           className="labelTextField"
//           size="small"
//         />
//       </label>
//       <label className="labelFormArea">
//         <span>Telephone No.</span>
//         <TextField
//           className="labelTextField"
//           size="small"
//         />
//       </label>
//     </CmModal>
//   );
// }
