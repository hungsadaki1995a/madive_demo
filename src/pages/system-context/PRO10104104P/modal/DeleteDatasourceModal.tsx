import CmModal from '@/components/atoms/CmModal';

type DeleteDatasourceModalPrpos = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function DeleteDatasourceModal({ visible, handleSave, handleClose }: DeleteDatasourceModalPrpos) {
  return (
    <CmModal
      title="Delete System Context Datasource"
      visible={visible}
      onSave={handleSave}
      onClose={handleClose}
      className="medium"
    >
      {/* contents */}
      <p className="pointTxt">Are you sure to delete this system context datasource?</p>
    </CmModal>
  );
}
