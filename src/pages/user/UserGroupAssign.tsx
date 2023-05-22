type propsType = {
  title: string;
};

function UserGroupAssign(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default UserGroupAssign;
