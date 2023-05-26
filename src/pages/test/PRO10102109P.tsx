type propsType = {
  title: string;
};

function CreateTestCase(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default CreateTestCase;
