import CmModal from '@/components/atoms/CmModal';

type SelectTargetDataModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function SelectTargetDataModal({ visible, handleSave, handleClose }: SelectTargetDataModalProps) {
  return (
    <CmModal
      title="Select Target Data"
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
