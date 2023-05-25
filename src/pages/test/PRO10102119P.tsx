type propsType = {
  title: string;
};

function History(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default History;
