import CmModal from '@/components/atoms/CmModal';

type EditServiceGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditServiceGroupModal({ visible, handleSave, handleClose }: EditServiceGroupModalProps) {
  return (
    <CmModal
      title="Edit Service Group"
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
