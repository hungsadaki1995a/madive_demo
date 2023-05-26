import TestCaseDataTable from './DataTable';

type propsType = {
  title: string;
};

function TestCase(props: propsType) {
  const { title } = props;
  return (
    <>
      <TestCaseDataTable />
    </>
  );
}
export default TestCase;
