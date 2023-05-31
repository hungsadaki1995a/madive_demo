import CmModal from '@/components/atoms/CmModal';

type CreateDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function CreateDatasourceModal({ visible, handleSave, handleClose }: CreateDatasourceModalProps) {
  return (
    <CmModal
      title="Create Datasource"
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
