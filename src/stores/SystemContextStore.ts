import { makeAutoObservable } from 'mobx';

import { ApplicationDtos, ContextDtos, SystemContextList } from '../types/dtos/systemContextDtos';

export class SystemContextStore {
  application: ApplicationDtos[] = [];
  context: ContextDtos = {
    conditionDto: [],
    count: 0,
    node_id: '',
    pageInfoDto: { pageLength: 0, pageNum: 0, sort: false, sortField: ' ', sortingType: '' },
    pagingResultDto: {
      count: 0,
      currentPage: 0,
      totalNum: 0,
      totalPage: 0,
    },
    physical_name: null,
    resource_id: '',
    systemContextName: [],
  };
  selectedNodes = '';
  selectedApplication = '';
  systemContextList: SystemContextList = {
    SystemContextDto: [
      {
        appName: null,
        conditionDto: [],
        key: '',
        node_id: '',
        pageInfoDto: { pageLength: 0, pageNum: 0, sort: false, sortField: ' ', sortingType: '' },
        pagingResultDto: {
          count: 0,
          currentPage: 0,
          totalNum: 0,
          totalPage: 0,
        },
        resource_id: '',
        systemContextName: '',
        value: '',
      },
    ],
    conditionDto: [],
    count: 0,
    pageInfoDto: { pageLength: 0, pageNum: 0, sort: false, sortField: ' ', sortingType: '' },
    pagingResultDto: {
      count: 0,
      currentPage: 0,
      totalNum: 0,
      totalPage: 0,
    },
  };
  total = 0;

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.application = [];
    this.selectedNodes = '';
    this.selectedApplication = '';
    this.context = { ...this.context };
    this.systemContextList = { ...this.systemContextList };
  };

  setSystemContextList = (systemContextListData: SystemContextList, total?: number) => {
    this.systemContextList = { ...systemContextListData };
    this.total = total as number;
  };

  setApplication = (application: ApplicationDtos[]) => {
    this.application = [...application];
  };

  setSelectedNodes = (selectedData: string) => {
    this.selectedNodes = selectedData;
  };

  setSelectedApplication = (selectedData: string) => {
    this.selectedApplication = selectedData;
  };

  setContext = (type: ContextDtos) => {
    this.context = { ...type };
  };
}
