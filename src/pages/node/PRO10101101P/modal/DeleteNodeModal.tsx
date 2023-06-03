import CmModal from '@/components/atoms/CmModal';

type DeleteNodeModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteNodeModal({ visible, handleSave, handleClose }: DeleteNodeModalPrpos) {
  return (
    <CmModal
      title="Delete Node"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this node ?</p>
    </CmModal>
  );
}
