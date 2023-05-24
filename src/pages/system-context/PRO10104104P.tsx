type propsType = {
  title: string;
};

function Datasource(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Datasource;
