type propsType = {
  title: string;
};

function LockAndUnlock(props: propsType) {
  const { title } = props;
  return <>{title} - Table Data Area</>;
}
export default LockAndUnlock;
