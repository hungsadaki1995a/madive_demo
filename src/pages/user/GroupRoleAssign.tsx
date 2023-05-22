type propsType = {
  title: string;
};

function GroupRoleAssign(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default GroupRoleAssign;
