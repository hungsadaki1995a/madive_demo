type propsType = {
  title: string;
};

function History(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default History;
