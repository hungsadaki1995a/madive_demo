import CmModal from '@/components/atoms/CmModal';

type EditDatasourceModalProps = {
  visible: boolean;
  handleSave?: () => void;
  handleClose: () => void;
};

export default function EditDatasourceModal({ visible, handleSave, handleClose }: EditDatasourceModalProps) {
  return (
    <CmModal
      title="Edit Datasource"
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
