import MetaDataTable from './DataTable';

type propsType = {
  title: string;
};

function Meta(props: propsType) {
  const { title } = props;
  return (
    <>
      <MetaDataTable />
    </>
  );
}
export default Meta;
