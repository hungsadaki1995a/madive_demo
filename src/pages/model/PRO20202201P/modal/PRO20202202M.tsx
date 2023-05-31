import CmModal from '@/components/atoms/CmModal';

type CreateDbioModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateDbioModal({ visible, handleSave, handleClose }: CreateDbioModalProps) {
  return (
    <CmModal
      title="Create Dbio"
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
