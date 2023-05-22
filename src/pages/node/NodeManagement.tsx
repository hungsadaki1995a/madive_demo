type propsType = {
  title: string;
};

function NodeManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default NodeManagement;
