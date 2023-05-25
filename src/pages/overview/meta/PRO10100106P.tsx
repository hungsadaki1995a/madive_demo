type propsType = {
  title: string;
};

function Meta(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default Meta;
