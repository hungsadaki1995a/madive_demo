type propsType = {
  title: string;
};

function CreateTestCase(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default CreateTestCase;
