import CmModal from '@/components/atoms/CmModal';

type DeleteMetaModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteMetaModal({ visible, handleSave, handleClose }: DeleteMetaModalPrpos) {
  return (
    <CmModal
      title="Delete Meta"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this meta ?</p>
    </CmModal>
  );
}
