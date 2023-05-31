import CmModal from '@/components/atoms/CmModal';

type SaveTestResultModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function SaveTestResultModal({ visible, handleSave, handleClose }: SaveTestResultModalProps) {
  return (
    <CmModal
      title="Save Test Result"
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
