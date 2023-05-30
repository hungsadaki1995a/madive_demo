import LockAndUnlockDataTable from './DataTable';

type propsType = {
  title: string;
};

function LockAndUnlock(props: propsType) {
  const { title } = props;
  return (
    <>
      <LockAndUnlockDataTable />
    </>
  );
}
export default LockAndUnlock;
