import CmModal from '@/components/atoms/CmModal';

type SaveTestCaseModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function SaveTestCaseModal({ visible, handleSave, handleClose }: SaveTestCaseModalProps) {
  return (
    <CmModal
      title="Save Test Case"
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
