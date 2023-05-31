import CmModal from '@/components/atoms/CmModal';

type AddSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function AddSystemContextModal({ visible, handleSave, handleClose }: AddSystemContextModalProps) {
  return (
    <CmModal
      title="Add System Context"
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
