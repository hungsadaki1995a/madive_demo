import { makeAutoObservable } from 'mobx';

import { MetaType } from '@/types/typeBundle';

export class MetaStore {
  meta: MetaType[] = [];
  selectedMeta: string[] = [];
  order: 'asc' | 'desc' = 'asc';
  orderProperty: keyof MetaType = 'physicalName';

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.meta = [];
    this.selectedMeta = [];
    this.order = 'asc';
    this.orderProperty = 'physicalName';
  };

  setMeta = (meta: MetaType[]) => {
    this.meta = meta;
  };

  setSelectedMeta = (selectedData: string[]) => {
    this.selectedMeta = selectedData;
  };

  setOrder = (order: 'asc' | 'desc') => {
    this.order = order;
  };

  setOrderProperty = (property: keyof MetaType) => {
    this.orderProperty = property;
  };
}
