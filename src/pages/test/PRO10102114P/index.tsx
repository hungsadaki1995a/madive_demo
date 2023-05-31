type propsType = {
  title: string;
};

function EditTestCase(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default EditTestCase;
