import NodeManagementDataTable from './DataTable';

type propsType = {
  title: string;
};

function NodeManagement(props: propsType) {
  const { title } = props;
  return (
    <>
      <NodeManagementDataTable />
    </>
  );
}
export default NodeManagement;
