type propsType = {
  title: string;
};

function RoleManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default RoleManagement;
