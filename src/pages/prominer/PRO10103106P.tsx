type propsType = {
  title: string;
};

function Varible(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default Varible;
