type propsType = {
  title: string;
};

function AppSG(props: propsType) {
  const { title } = props;
  return <>{title}</>;
}
export default AppSG;
