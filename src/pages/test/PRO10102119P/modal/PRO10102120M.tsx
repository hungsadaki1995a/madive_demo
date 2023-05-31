import CmModal from '@/components/atoms/CmModal';

type ViewDetailModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function ViewDetailModal({ visible, handleSave, handleClose }: ViewDetailModalProps) {
  return (
    <CmModal
      title="View Detail"
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
