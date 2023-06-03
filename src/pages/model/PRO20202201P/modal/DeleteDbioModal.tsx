import CmModal from '@/components/atoms/CmModal';

type DeleteDbioModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteDbioModal({ visible, handleSave, handleClose }: DeleteDbioModalPrpos) {
  return (
    <CmModal
      title="Delete Dbio"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this dbio ?</p>
    </CmModal>
  );
}
