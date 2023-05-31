import CmModal from '@/components/atoms/CmModal';

type SelectResourceDataModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function SelectResourceDataModal({ visible, handleSave, handleClose }: SelectResourceDataModalProps) {
  return (
    <CmModal
      title="Select Resource Data"
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
