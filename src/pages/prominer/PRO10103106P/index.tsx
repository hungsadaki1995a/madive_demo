import ProminerVaribleDataTable from './DataTable';

type propsType = {
  title: string;
};

function Varible(props: propsType) {
  const { title } = props;
  return (
    <>
      <ProminerVaribleDataTable />
    </>
  );
}
export default Varible;
