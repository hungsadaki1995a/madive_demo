type propsType = {
  title: string;
};

function Method(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default Method;
