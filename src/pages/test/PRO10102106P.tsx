type propsType = {
  title: string;
};

function TestCase(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default TestCase;
