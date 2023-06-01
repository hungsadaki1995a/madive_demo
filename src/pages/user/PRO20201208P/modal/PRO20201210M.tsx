import CmModal from '@/components/atoms/CmModal';

type EditRoleModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditRoleModal({ visible, handleSave, handleClose }: EditRoleModalProps) {
  return (
    <CmModal
      title="Edit Role"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      contents area
    </CmModal>
  );
}
