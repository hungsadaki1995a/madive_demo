import DataTable from './DataTable';

type propsType = {
  title: string;
};

function UserManagement(props: propsType) {
  const { title } = props;
  return (
    <>
      {/* <h1>{title}</h1> */}
      <DataTable />
    </>
  );
}
export default UserManagement;
