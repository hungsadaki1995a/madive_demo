type propsType = {
  title: string;
};

function GroupManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default GroupManagement;
