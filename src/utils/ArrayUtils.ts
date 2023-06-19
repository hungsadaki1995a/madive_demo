import { IPlainObject } from '@/types/common';

export const getObjectValuesByKey = (arr: IPlainObject[], key: string): string[] => {
  return arr.map((object) => `${object[key]}`);
};
