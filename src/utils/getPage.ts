import { PaginationType } from '@/types/typeBundle';

const getPage = (pagination: PaginationType, targetIdx: number) =>
  targetIdx >= pagination.page * pagination.pageSize &&
  targetIdx < (pagination.page + 1) * pagination.pageSize;

export default getPage;
