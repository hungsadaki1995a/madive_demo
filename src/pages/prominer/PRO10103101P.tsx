type propsType = {
  title: string;
};

function Resource(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default Resource;
