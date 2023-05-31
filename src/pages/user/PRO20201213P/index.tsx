import RolePermissionAssignDataTable from './DataTable';

type propsType = {
  title: string;
};

function RolePermissionAssign(props: propsType) {
  const { title } = props;
  return (
    <>
      <RolePermissionAssignDataTable />
    </>
  );
}
export default RolePermissionAssign;
