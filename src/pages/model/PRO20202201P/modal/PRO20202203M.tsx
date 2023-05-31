import CmModal from '@/components/atoms/CmModal';

type EditDbioModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDbioModal({ visible, handleSave, handleClose }: EditDbioModalProps) {
  return (
    <CmModal
      title="Edit Dbio"
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
