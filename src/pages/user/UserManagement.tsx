type propsType = {
  title: string;
};

function UserManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default UserManagement;
