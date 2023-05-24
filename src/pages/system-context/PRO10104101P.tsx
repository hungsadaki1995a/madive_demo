type propsType = {
  title: string;
};

function SystemContextManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default SystemContextManagement;
