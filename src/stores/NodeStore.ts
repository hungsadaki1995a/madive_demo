import { makeAutoObservable } from 'mobx';
import { NodeType } from '@/types/typeBundle';

export class NodeStore {
  nodes: NodeType[] = [];
  masterNodes: NodeType[] = [];
  selectedNodes: string[] = [];
  order: 'asc' | 'desc' = 'asc';
  orderProperty: keyof NodeType = 'nodeName';
  searchType = 'Node Name';
  searchNodeType = 'ALL';

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

  setNodes = (nodes: NodeType[]) => {
    this.nodes = [...nodes];
    this.masterNodes = nodes.filter((node) => node.nodeType === 'MASTER');
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
}
