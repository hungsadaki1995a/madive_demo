import CmModal from '@/components/atoms/CmModal';

type DeleteGroupModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteGroupModal({ visible, handleSave, handleClose }: DeleteGroupModalPrpos) {
  return (
    <CmModal
      title="Delete Group"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this group ?</p>
    </CmModal>
  );
}
