import CmModal from '@/components/atoms/CmModal';

type CreateRoleModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateRoleModal({ visible, handleSave, handleClose }: CreateRoleModalProps) {
  return (
    <CmModal
      title="Create Role"
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
