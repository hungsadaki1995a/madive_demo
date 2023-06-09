interface DropdownType {
  value: string | number;
  label: string;
}
type IObjectData = {
  [value: string]: string | number;
};

export const formatDropdownData = (
  data: IObjectData[],
  value: string,
  label: string,
  isUseDefault?: boolean
): DropdownType[] => {
  const defaultValue = [{ value: '', label: 'All' }];

  const newData = data?.map((item: IObjectData) => {
    return {
      value: item[value],
      label: item[label] + '',
    };
  });

  if (isUseDefault) {
    return [...defaultValue, ...newData];
  }

  return newData;
};
