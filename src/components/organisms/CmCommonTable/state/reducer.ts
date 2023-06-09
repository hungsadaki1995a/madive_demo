import { TableActionName } from '../const';
import { ActionType, TableViewState } from '../types';

export const tableReducer = (state: TableViewState, action: ActionType): TableViewState => {
  const { type, payload } = action;
  switch (type) {
    case TableActionName.CHANGE_PAGE: {
      return {
        ...state,
        currentPage: payload.page,
      };
    }
    case TableActionName.CHANGE_PAGE_SIZE: {
      return {
        ...state,
        pageSize: payload.pageSize,
        currentPage: payload.page,
      };
    }
    case TableActionName.CHANGE_SORT_BY: {
      return {
        ...state,
        ...payload,
      };
    }
    case TableActionName.CHANGE_FILTER_CLIENT: {
      return {
        ...state,
        filter: {
          ...state.filter,
          client: {
            // ...state.filter,
            ...payload,
          },
        },
        currentPage: 0,
      };
    }
    case TableActionName.CHANGE_FILTER_SERVER: {
      return {
        ...state,
        filter: {
          ...state.filter,
          server: {
            // ...state.filter,
            ...payload,
          },
        },
        currentPage: 0,
      };
    }
    case TableActionName.RESET_PAGE_AND_RELOAD: {
      return {
        ...state,
        currentPage: 0,
        invalidate: true,
      };
    }
    case TableActionName.CHANGE_INVALIDATE: {
      return {
        ...state,
        invalidate: payload.invalidate,
      };
    }
    default:
      return state;
  }
};
