type propsType = {
  title: string;
};

function Method(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Method;
