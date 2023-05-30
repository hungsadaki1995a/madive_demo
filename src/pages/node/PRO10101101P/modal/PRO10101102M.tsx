import CmModal from '@/components/atoms/CmModal';

type CreateNodeModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateNodeModal({ visible, handleSave, handleClose }: CreateNodeModalProps) {
  return (
    <CmModal
      title="Create Node"
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
