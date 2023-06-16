import { SEARCH_CONDITION_CACHED } from './const/cached';

export const clearAllCacheLocalStorage = () => {
  localStorage.removeItem(SEARCH_CONDITION_CACHED);
};
