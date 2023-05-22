type propsType = {
  title: string;
};

function LogManagement(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default LogManagement;
