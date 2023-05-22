type propsType = {
  title: string;
};

function Resource(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Resource;
