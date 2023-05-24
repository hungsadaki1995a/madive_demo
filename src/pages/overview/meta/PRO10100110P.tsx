type propsType = {
  title: string;
};

function MetaHistory(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default MetaHistory;
