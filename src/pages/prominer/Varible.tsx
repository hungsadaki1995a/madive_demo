type propsType = {
  title: string;
};

function Varible(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Varible;
