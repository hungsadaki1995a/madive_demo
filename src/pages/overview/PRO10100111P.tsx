type propsType = {
  title: string;
};

function DoInfo(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default DoInfo;
