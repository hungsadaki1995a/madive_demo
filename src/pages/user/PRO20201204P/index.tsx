import HistoryDataTable from './DataTable';

type propsType = {
  title: string;
};

function History(props: propsType) {
  const { title } = props;
  return (
    <>
      <HistoryDataTable />
    </>
  );
}
export default History;
