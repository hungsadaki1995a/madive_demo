type propsType = {
  title: string;
};

function RolePermissionAssign(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default RolePermissionAssign;
