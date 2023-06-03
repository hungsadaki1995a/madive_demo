import CmModal from '@/components/atoms/CmModal';

type DeleteRoleModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteRoleModal({ visible, handleSave, handleClose }: DeleteRoleModalPrpos) {
  return (
    <CmModal
      title="Delete Role"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this role ?</p>
    </CmModal>
  );
}
