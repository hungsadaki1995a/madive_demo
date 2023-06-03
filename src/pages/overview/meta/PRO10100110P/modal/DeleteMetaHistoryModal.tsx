import CmModal from '@/components/atoms/CmModal';

type DeleteMetaHistoryModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteMetaHistoryModal({ visible, handleSave, handleClose }: DeleteMetaHistoryModalPrpos) {
  return (
    <CmModal
      title="Delete Meta History"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this meta history ?</p>
    </CmModal>
  );
}
