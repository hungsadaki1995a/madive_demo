import CmModal from '@/components/atoms/CmModal';

type CreateGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateGroupModal({ visible, handleSave, handleClose }: CreateGroupModalProps) {
  return (
    <CmModal
      title="Create Group"
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
