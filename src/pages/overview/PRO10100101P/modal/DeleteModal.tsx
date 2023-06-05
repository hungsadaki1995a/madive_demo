import CmModal from '@/components/atoms/CmModal';

type DeleteModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteModal({ visible, handleSave, handleClose }: DeleteModalPrpos) {
  return (
    <CmModal
      title="Delete Application"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this application ?</p>
    </CmModal>
  );
}
