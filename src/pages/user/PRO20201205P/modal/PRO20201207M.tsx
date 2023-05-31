import CmModal from '@/components/atoms/CmModal';

type EditGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditGroupModal({ visible, handleSave, handleClose }: EditGroupModalProps) {
  return (
    <CmModal
      title="Edit Group"
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
