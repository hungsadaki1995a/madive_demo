import CmModal from '@/components/atoms/CmModal';

type ViewTestResultModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ViewTestResultModal({ visible, handleSave, handleClose }: ViewTestResultModalProps) {
  return (
    <CmModal
      title="View Test Result"
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
