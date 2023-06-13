import { makeAutoObservable } from 'mobx';

import DbioModel from '@/types/models/dbioModel';

export class DbioStore {
  dbios: DbioModel[] = [];
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  setDbios = (dbioInfo: DbioModel[]) => {
    this.dbios = dbioInfo;
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };

  addDbio = (dbioInfo: DbioModel) => {
    this.dbios = [...this.dbios, dbioInfo];
  };

  updateDbio = (dbioInfo: DbioModel) => {
    const storedDbioIndex = this.dbios.findIndex((x) => x.alias === dbioInfo.alias);
    const temp = [...this.dbios];
    temp[storedDbioIndex] = dbioInfo;
    this.dbios = temp;
  };

  deleteDbio = (dbioInfo: DbioModel[]) => {
    this.dbios = this.dbios.filter((x) => !dbioInfo.some((dbio) => dbio.alias === x.alias));
  };
}
