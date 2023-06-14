import { makeAutoObservable } from 'mobx';

import { MetaHistoryDto } from '@/types/dtos/metaHistoryDtos';

export class MetaHistoryStore {
  metaHistory: MetaHistoryDto[] = [];
  total = 0;
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMetaHistory = (metaHistory: MetaHistoryDto[], total: number) => {
    this.metaHistory = metaHistory;
    this.total = total;
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };

  deleteMetaHistory = (metaHistoryId: string) => {
    this.metaHistory = this.metaHistory.filter((x) => x.history_id !== metaHistoryId);
  };
}
