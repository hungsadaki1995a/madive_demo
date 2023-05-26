type propsType = {
  title: string;
};

function NodeManagement(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default NodeManagement;
