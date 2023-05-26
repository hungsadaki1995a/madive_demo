import MetaHistoryDataTable from './DataTable';

type propsType = {
  title: string;
};

function MetaHistory(props: propsType) {
  const { title } = props;
  return (
    <>
      <MetaHistoryDataTable />;
    </>
  );
}
export default MetaHistory;
