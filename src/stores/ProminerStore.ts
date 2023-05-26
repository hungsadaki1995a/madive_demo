import { makeAutoObservable } from 'mobx';

import { DependencyOptionsType, DependencyResponseType, ResourceResponseType } from '@/types/typeBundle';

export class ProminerStore {
  dependencyValue: DependencyResponseType = {
    createdAt: '',
    id: -1,
    projects: [{ id: -1, name: '' }],
    repository: {
      branchName: '',
      lastCommitId: '',
      name: '',
      platform: { type: '', url: '' },
      token: '',
      url: '',
    },
  };
  resourceValue: ResourceResponseType[] = [];
  dependencyDirection: 'FORWARD' | 'BACKWARD' = 'FORWARD';
  dependencyOptions: DependencyOptionsType = {
    project: '',
    type: 'ALL',
    direction: 'Forward',
    name: '',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setDependency = (dependencyInfo: DependencyResponseType) => {
    this.dependencyValue = dependencyInfo;
  };

  setResources = (resourceInfo: ResourceResponseType[]) => {
    this.resourceValue = resourceInfo;
  };

  setDependencyOptions = (optionsInfo: DependencyOptionsType) => {
    this.dependencyOptions = optionsInfo;
  };

  setResourceValue = (resourceValue: ResourceResponseType[]) => {
    this.resourceValue = resourceValue;
  };

  setDependencyDirection = (dir: 'FORWARD' | 'BACKWARD') => {
    this.dependencyDirection = dir;
  };
}
