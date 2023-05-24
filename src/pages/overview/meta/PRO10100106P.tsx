type propsType = {
  title: string;
};

function Meta(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Meta;
