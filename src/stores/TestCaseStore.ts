import { makeAutoObservable } from 'mobx';

import { TestCaseDto } from '@/types/dtos/testCaseDtos';

export class TestCaseStore {
  testCases: TestCaseDto[] = [];
  total = 0;
  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTestCases = (testCases: TestCaseDto[], total: number) => {
    this.testCases = testCases;
    this.total = total;
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };
}
