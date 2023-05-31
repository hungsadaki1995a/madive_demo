import ProminerFieldDataTable from './DataTable';

type propsType = {
  title: string;
};

function Field(props: propsType) {
  const { title } = props;
  return (
    <>
      <ProminerFieldDataTable />
    </>
  );
}
export default Field;
