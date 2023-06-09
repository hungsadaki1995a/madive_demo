import { DispatchFunction, FilterFormType, ISortInfo } from '../types';
import { TableActionName } from './../const';

export const TableActions = {
  changePage:
    (dispatch: DispatchFunction) =>
    (page: number): void => {
      return dispatch({ type: TableActionName.CHANGE_PAGE, payload: { page } });
    },
  changePageSize:
    (dispatch: DispatchFunction) =>
    (pageSize: number): void => {
      return dispatch({ type: TableActionName.CHANGE_PAGE_SIZE, payload: { pageSize, page: 0 } });
    },
  changeSort:
    (dispatch: DispatchFunction) =>
    (sortBy: ISortInfo): void => {
      return dispatch({ type: TableActionName.CHANGE_SORT_BY, payload: { sortBy } });
    },
  changeFilterClient:
    (dispatch: DispatchFunction) =>
    (filter: FilterFormType): void => {
      return dispatch({ type: TableActionName.CHANGE_FILTER_CLIENT, payload: filter });
    },
  changeFilterServer:
    (dispatch: DispatchFunction) =>
    (filter: FilterFormType): void => {
      return dispatch({ type: TableActionName.CHANGE_FILTER_SERVER, payload: filter });
    },
  resetCurrentPageAndRefresh: (dispatch: DispatchFunction) => (): void => {
    return dispatch({ type: TableActionName.RESET_PAGE_AND_RELOAD, payload: null });
  },
  changeInvalidateTableState:
    (dispatch: DispatchFunction) =>
    (invalidate: boolean): void => {
      return dispatch({ type: TableActionName.CHANGE_INVALIDATE, payload: { invalidate } });
    },
};
