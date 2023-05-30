import CmModal from '@/components/atoms/CmModal';

type EditNodeModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditNodeModal({ visible, handleSave, handleClose }: EditNodeModalProps) {
  return (
    <CmModal
      title="Edit Node"
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
