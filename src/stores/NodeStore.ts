import { makeAutoObservable } from 'mobx';

import { NodeDto } from '@/types/dtos/nodeDtos';
import { NodeType } from '@/types/typeBundle';

export class NodeStore {
  nodes: NodeDto[] = [];
  masterNodes: NodeDto[] = [];
  selectedNodes: string[] = [];
  order: 'asc' | 'desc' = 'asc';
  orderProperty: keyof NodeType = 'nodeName';
  searchType = 'Node Name';
  searchNodeType = 'ALL';

  isFetching = false;

  constructor() {
    makeAutoObservable(this);
  }

  initProperties = () => {
    this.nodes = [];
    this.masterNodes = [];
    this.selectedNodes = [];
    this.order = 'asc';
    this.orderProperty = 'nodeName';
    this.searchType = 'Node Name';
    this.searchNodeType = 'ALL';
  };

  setNodes = (nodes: NodeDto[]) => {
    this.nodes = [...nodes];
    this.masterNodes = nodes.filter((node) => node.node_type === 'MASTER');
  };

  setSelectedNodes = (selectedData: string[]) => {
    this.selectedNodes = selectedData;
  };

  setOrder = (order: 'asc' | 'desc') => {
    this.order = order;
  };

  setOrderProperty = (property: keyof NodeType) => {
    this.orderProperty = property;
  };

  setSearchType = (type: string) => {
    this.searchType = type;
  };

  setSearchNodeType = (type: string) => {
    this.searchNodeType = type;
  };

  setIsFetching = (val: boolean) => {
    this.isFetching = val;
  };
}
