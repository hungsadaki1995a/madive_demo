type propsType = {
  title: string;
};

function ViewResourceDetail(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default ViewResourceDetail;
