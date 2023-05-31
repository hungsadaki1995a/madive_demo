type propsType = {
  title: string;
};

function DoInfo(props: propsType) {
  const { title } = props;
  return <>{title} - AS-IS, Figma 정보 없음</>;
}
export default DoInfo;
