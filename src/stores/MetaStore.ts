import { makeAutoObservable } from 'mobx';

import { MetaDtos } from '@/types/dtos/MetaDtos';

export class MetaStore {
  meta: MetaDtos[] = [];
  selectedMeta: string[] = [];
  order: 'asc' | 'desc' = 'asc';
  orderProperty: keyof MetaDtos = 'physical_name';
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.meta = [];
    this.selectedMeta = [];
    this.order = 'asc';
    this.orderProperty = 'physical_name';
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };

  setMeta = (meta: MetaDtos[]) => {
    this.meta = meta;
  };

  setSelectedMeta = (selectedData: string[]) => {
    this.selectedMeta = selectedData;
  };

  setOrder = (order: 'asc' | 'desc') => {
    this.order = order;
  };

  setOrderProperty = (property: keyof MetaDtos) => {
    this.orderProperty = property;
  };
}
