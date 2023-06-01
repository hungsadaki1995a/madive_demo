import GroupManagementDataTable from './DataTable';

type propsType = {
  title: string;
};

function GroupManagement(props: propsType) {
  const { title } = props;
  return (
    <>
      <GroupManagementDataTable />
    </>
  );
}
export default GroupManagement;
