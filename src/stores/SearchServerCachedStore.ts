import { makeAutoObservable } from 'mobx';

import { SearchCachedCondition, SearchCachedFromPath } from '@/components/organisms/CmCommonTable/types';

import { SEARCH_CONDITION_CACHED } from '@/utils/const/cached';
import { tryCatch } from '@/utils/tryCatch';

export class SearchServerCachedStore {
  searchConditionGroups: SearchCachedFromPath[] = [];

  constructor() {
    makeAutoObservable(this);
    const searchConditionsCached = localStorage.getItem(SEARCH_CONDITION_CACHED);
    const searchConditionParsed: SearchCachedFromPath[] =
      tryCatch(JSON.parse, [], searchConditionsCached || '[]') || [];
    this.searchConditionGroups = searchConditionParsed;
  }

  getSearchGroupsCachedFromPath = (path: string): SearchCachedCondition[] => {
    const currentPathConditions =
      this.searchConditionGroups.find((condition: SearchCachedFromPath) => condition.path === path) || null;
    return currentPathConditions?.conditions || [];
  };

  addSearchConditionToCache = (searchConditions: SearchCachedCondition, path: string): void => {
    const searchConditionsCached = localStorage.getItem(SEARCH_CONDITION_CACHED);
    const searchConditionParsed: SearchCachedFromPath[] =
      tryCatch(JSON.parse, [], searchConditionsCached || '[]') || [];
    const conditionCurrentRouteIdx = searchConditionParsed.findIndex(
      (condition: SearchCachedFromPath) => condition.path === path
    );
    if (conditionCurrentRouteIdx >= 0) {
      searchConditionParsed[conditionCurrentRouteIdx].conditions.push({
        name: searchConditions.name,
        conditions: searchConditions.conditions,
      });
    } else {
      searchConditionParsed.push({
        path: path,
        conditions: [
          {
            name: searchConditions.name,
            conditions: searchConditions.conditions,
          },
        ],
      });
    }
    localStorage.setItem(SEARCH_CONDITION_CACHED, JSON.stringify(searchConditionParsed));
    this.searchConditionGroups = searchConditionParsed;
  };

  removeSearchConditionFromCache = (searchConditionGroupName: string, path: string) => {
    const searchConditionsCached = localStorage.getItem(SEARCH_CONDITION_CACHED);
    const searchConditionParsed: SearchCachedFromPath[] =
      tryCatch(JSON.parse, [], searchConditionsCached || '[]') || [];
    const conditionCurrentRouteIdx = searchConditionParsed.findIndex(
      (condition: SearchCachedFromPath) => condition.path === path
    );
    if (conditionCurrentRouteIdx >= 0) {
      searchConditionParsed[conditionCurrentRouteIdx].conditions = searchConditionParsed[
        conditionCurrentRouteIdx
      ].conditions.filter((condition) => condition.name !== searchConditionGroupName);
    }
    localStorage.setItem(SEARCH_CONDITION_CACHED, JSON.stringify(searchConditionParsed));
    this.searchConditionGroups = searchConditionParsed;
  };

  checkSearchGroupNameAlready = (searchConditionGroupName: string, path: string): boolean => {
    const currentPathConditions =
      this.searchConditionGroups.find((condition: SearchCachedFromPath) => condition.path === path) || null;
    const conditions = currentPathConditions?.conditions || [];
    return conditions.findIndex((condition) => condition.name === searchConditionGroupName) >= 0;
  };

  resetSearchCache = () => {
    this.searchConditionGroups = [];
  };
}
