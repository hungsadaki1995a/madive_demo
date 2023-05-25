type propsType = {
  title: string;
};

function Field(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default Field;
