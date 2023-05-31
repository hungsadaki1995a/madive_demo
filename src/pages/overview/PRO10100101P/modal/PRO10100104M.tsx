import CmModal from '@/components/atoms/CmModal';

type AddServiceGroupModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function AddServiceGroupModal({ visible, handleSave, handleClose }: AddServiceGroupModalProps) {
  return (
    <CmModal
      title="Add Service Group"
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
