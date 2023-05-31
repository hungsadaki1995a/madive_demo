import CmModal from '@/components/atoms/CmModal';

type EditMetaModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditMetaModal({ visible, handleSave, handleClose }: EditMetaModalProps) {
  return (
    <CmModal
      title="Edit Meta"
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
