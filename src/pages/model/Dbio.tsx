type propsType = {
  title: string;
};

function Dbio(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Dbio;
