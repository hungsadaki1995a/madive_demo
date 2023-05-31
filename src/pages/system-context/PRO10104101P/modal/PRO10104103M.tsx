import CmModal from '@/components/atoms/CmModal';

type EditSystemContextModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditSystemContextModal({ visible, handleSave, handleClose }: EditSystemContextModalProps) {
  return (
    <CmModal
      title="Edit System Context"
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
