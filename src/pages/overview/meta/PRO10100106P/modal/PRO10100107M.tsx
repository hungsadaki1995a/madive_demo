import CmModal from '@/components/atoms/CmModal';

type CreateMetaModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateMetaModal({ visible, handleSave, handleClose }: CreateMetaModalProps) {
  return (
    <CmModal
      title="Create Meta"
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
