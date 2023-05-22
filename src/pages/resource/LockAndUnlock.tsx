type propsType = {
  title: string;
};

function LockAndUnlock(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default LockAndUnlock;
