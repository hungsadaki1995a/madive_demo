type propsType = {
  title: string;
};

function Field(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Field;
