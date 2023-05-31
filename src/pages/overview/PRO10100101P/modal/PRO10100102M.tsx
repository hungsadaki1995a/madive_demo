import CmModal from '@/components/atoms/CmModal';

type CreateApplicationModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateApplicationModal({ visible, handleSave, handleClose }: CreateApplicationModalProps) {
  return (
    <CmModal
      title="Create Application"
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
