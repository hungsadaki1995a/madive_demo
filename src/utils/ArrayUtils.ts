import { IPlainObject } from '@/components/organisms/CmCommonTable/types';

export const getObjectValuesByKey = (arr: IPlainObject[], key: string): string[] => {
  return arr.map((object) => `${object[key]}`);
};
