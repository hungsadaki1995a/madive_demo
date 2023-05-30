import ProminerMethodDataTable from './DataTable';

type propsType = {
  title: string;
};

function Method(props: propsType) {
  const { title } = props;
  return (
    <>
      <ProminerMethodDataTable />
    </>
  );
}
export default Method;
