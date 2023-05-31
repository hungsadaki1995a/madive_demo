import RoleManagementDataTable from './DataTable';

type propsType = {
  title: string;
};

function RoleManagement(props: propsType) {
  const { title } = props;
  return (
    <>
      <RoleManagementDataTable />
    </>
  );
}
export default RoleManagement;
