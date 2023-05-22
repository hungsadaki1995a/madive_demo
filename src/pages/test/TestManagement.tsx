type propsType = {
  title: string;
};

function Test(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default Test;
