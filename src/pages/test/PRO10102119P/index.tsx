import TestHistoryDataTable from './DataTable';

type propsType = {
  title: string;
};

function History(props: propsType) {
  const { title } = props;
  return (
    <>
      <TestHistoryDataTable />
    </>
  );
}
export default History;
