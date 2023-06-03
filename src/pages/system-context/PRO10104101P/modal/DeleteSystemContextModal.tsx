import CmModal from '@/components/atoms/CmModal';

type DeleteSystemContextModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteSystemContextModal({ visible, handleSave, handleClose }: DeleteSystemContextModalPrpos) {
  return (
    <CmModal
      title="Delete System Context"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this system context ?</p>
    </CmModal>
  );
}
