import DoInfoDataTable from './DataTable';

type propsType = {
  title: string;
};

function DoInfo(props: propsType) {
  const { title } = props;
  return (
    <>
      <DoInfoDataTable />
    </>
  );
}
export default DoInfo;
