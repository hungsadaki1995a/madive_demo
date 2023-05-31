import PorminerResourceDataTable from './DataTable';

type propsType = {
  title: string;
};

function Resource(props: propsType) {
  const { title } = props;
  return (
    <>
      <PorminerResourceDataTable />
    </>
  );
}
export default Resource;
