import CmModal from '@/components/atoms/CmModal';

type DeleteLogControlItemModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteLogControlItemModal({
  visible,
  handleSave,
  handleClose,
}: DeleteLogControlItemModalPrpos) {
  return (
    <CmModal
      title="Delete Log Control Item"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this log control item ?</p>
    </CmModal>
  );
}
