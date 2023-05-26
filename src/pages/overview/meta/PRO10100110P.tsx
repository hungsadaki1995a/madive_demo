type propsType = {
  title: string;
};

function MetaHistory(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default MetaHistory;
