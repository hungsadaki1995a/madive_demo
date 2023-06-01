import DbioDataTable from './DataTable';

type propsType = {
  title: string;
};

function Dbio(props: propsType) {
  const { title } = props;
  return (
    <>
      <DbioDataTable />
    </>
  );
}
export default Dbio;
